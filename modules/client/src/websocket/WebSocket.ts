// deno-lint-ignore-file no-explicit-any
import type { Client } from '../Client.ts';
import { ClientUser } from '../structures/mod.ts';
import { Events, WSEvents } from '../Constants.ts';
import { Error } from '../errors/mod.ts';

declare function clearInterval(id: number): void;
declare function setInterval(
  cb: (...args: any[]) => void,
  delay?: number,
  ...args: any[]
): number;

export class WebSocketShard {
  heartbeatInterval?: number;
  lastPingTimestamp?: number;
  lastPongAcked = false;
  socket: WebSocket | null = null;
  connected = false;
  ready = false;
  reconnecting: Promise<unknown> | null = null;

  constructor(protected readonly client: Client) {}

  private debug(message: unknown): void {
    this.client.emit(Events.DEBUG, `[WS]: ${message}`);
  }

  async send(data: unknown): Promise<void> {
    if (this.reconnecting) {
      this.debug('Waiting reconnecting...');
      await this.reconnecting;
    }

    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      this.debug(
        `Tried to send packet '${
          JSON.stringify(data)
        }' but no WebSocket is available!`,
      );
    }
  }

  private onOpen(): void {
    console.log('Socket opened');
    if (!this.client.token) throw new Error('INVALID_TOKEN');
    this.send({
      event: WSEvents.AUTHENTICATE,
      token: this.client.token,
    });
  }

  get ping(): number {
    if (!this.lastPingTimestamp) return -0;
    return Date.now() - this.lastPingTimestamp;
  }

  setHeartbeatTimer(time: number): void {
    this.debug(`Setting a heartbeat interval for ${time}ms.`);

    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (time !== -1) {
      this.heartbeatInterval = setInterval(() => this.sendHeartbeat(), time);
    }
  }

  sendHeartbeat(): void {
    this.debug('Sending a heartbeat.');

    if (!this.lastPongAcked) {
      this.debug('Did not receive a pong ack last time.');
      if (this.client.options.ws.reconnect) {
        this.debug('Reconnecting...');
        this.reconnecting = this.destroy().then(() => this.connect()).then(() =>
          this.reconnecting = null
        );
      }
    }

    const now = Date.now();
    this.send({ type: WSEvents.PING, data: now });
    this.lastPongAcked = false;
    this.lastPingTimestamp = now;
  }

  private onError(event: unknown): void {
    this.client.emit(Events.ERROR, event);
  }

  private onMessage({ data }: { data: unknown }): void {
    console.log(data);
    let packet: unknown;

    try {
      packet = JSON.parse(String(data));
    } catch (err) {
      this.client.emit(Events.ERROR, err);
      return;
    }

    this.client.emit(Events.RAW, packet);

    this.onPacket(packet).catch((e) => this.client.emit(Events.ERROR, e));
  }

  private onClose(event: { code: number; reason: string }): void {
    this.debug(`Closed with reason: ${event.reason}, code: ${event.code}`);
    this.destroy();
  }

  private async onPacket(packet: any) {
    if (!packet) {
      this.debug(`Received broken packet: '${packet}'.`);
      return;
    }

    switch (packet.event) {
      case WSEvents.AUTHENTICATED:
        this.connected = true;
        break;
      case WSEvents.PONG:
        this.debug(`Received a heartbeat.`);
        this.lastPongAcked = true;
        break;
      case WSEvents.ERROR:
        this.client.emit(Events.ERROR, packet.error);
        break;
      case WSEvents.READY: {
        this.lastPongAcked = true;

        this.client.user = new ClientUser(this.client, packet.user);

        for (const user of packet.users) {
          this.client.users.add(user);
        }

        for (const server of packet.servers) {
          this.client.servers.add(server);
        }

        for (const channel of packet.channels) {
          this.client.channels.add(channel);
        }

        // TODO:
        // this.setHeartbeatTimer(this.client.options.ws.heartbeat);

        this.ready = true;

        this.client.emit(Events.READY, this.client);
        break;
      }
      default: {
        const action = this.client.actions.get(packet.event);

        if (action) {
          await action.handle(packet);
        } else {
          this.debug(`Received unknown packet "${packet.event}"`);
        }

        break;
      }
    }
  }

  connect(): Promise<this> {
    return new Promise((resolve) => {
      if (this.socket?.readyState === WebSocket.OPEN && this.ready) {
        return resolve(this);
      }

      const ws = (this.socket = this.socket ??
        new WebSocket(this.client.options.ws.url));

      ws.onopen = this.onOpen.bind(this);
      ws.onmessage = this.onMessage.bind(this);
      ws.onerror = this.onError.bind(this);
      ws.onclose = this.onClose.bind(this);
      ws.addEventListener('open', () => resolve(this));
    });
  }

  destroy(): Promise<void> {
    return new Promise((resolve) => {
      this.setHeartbeatTimer(-1);
      this.connected = false;
      this.ready = false;

      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.addEventListener('close', () => {
          this.socket = null;
          resolve();
        });

        this.socket.close();
      } else {
        this.socket = null;
        resolve();
      }
    });
  }
}
