import { Channel } from './Channel.ts';
import { APIChannel } from '../deps.ts';
import type { Server } from './mod.ts';
import { Error } from '../errors/mod.ts';

export abstract class ServerChannel extends Channel {
  name!: string;
  serverId!: string;

  protected _patch(data: APIChannel): this {
    super._patch(data);
    if (data.name) this.name = data.name;
    if (data.server_id) this.serverId = data.server_id;
    return this;
  }

  get server(): Server {
    const server = this.client.servers.cache.get(this.serverId);

    if (!server) {
      throw new Error('UNCACHED_SERVER');
    }

    return server;
  }
}

export { ChannelType } from './Channel.ts';
