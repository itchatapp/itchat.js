import { BaseClient } from './BaseClient.ts';
import { ChannelManager, ServerManager, UserManager } from './managers/mod.ts';
import { ActionManager } from './actions/ActionManager.ts';
import { ClientUser } from './structures/mod.ts';
import { WebSocketShard } from './websocket/mod.ts';

export class Client extends BaseClient {
  readonly actions = new ActionManager(this);
  readonly users = new UserManager(this);
  readonly servers = new ServerManager(this);
  readonly channels = new ChannelManager(this);
  readonly ws = new WebSocketShard(this);
  user: ClientUser | null = null;
  readyAt: Date | null = null;

  async login(token: string): Promise<void> {
    if (!token) throw new Error('INVALID_TOKEN');

    this.token = token;

    this.debug('Preparing to connect to the gateway...');

    try {
      await this.ws.connect();
    } catch (err) {
      await this.destroy();
      throw err;
    }

    this.readyAt = new Date();
  }

  async destroy(): Promise<void> {
    this.token = null;
    this.user = null;
    this.readyAt = null;
    await this.ws.destroy();
  }
}
