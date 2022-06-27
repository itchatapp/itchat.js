import { Channel, Overwrite, OverwriteType } from './Channel.ts';
import { APIChannel, Collection, Permissions } from '../deps.ts';
import type { Server } from './mod.ts';
import { Error } from '../errors/mod.ts';

export abstract class ServerChannel extends Channel {
  name!: string;
  serverId!: string;
  overwrites = new Collection<string, Overwrite>();

  protected _patch(data: APIChannel): this {
    super._patch(data);

    if (data.name) this.name = data.name;
    if (data.server_id) this.serverId = data.server_id;
    if (data.overwrites) {
      this.overwrites = data.overwrites.reduce((coll, cur) => {
        coll.set(cur.id, {
          id: cur.id,
          type: OverwriteType[
            OverwriteType[cur.type] as keyof typeof OverwriteType
          ],
          allow: new Permissions(BigInt(cur.allow)),
          deny: new Permissions(BigInt(cur.deny)),
        });
        return coll;
      }, new Collection<string, Overwrite>());
    }

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
