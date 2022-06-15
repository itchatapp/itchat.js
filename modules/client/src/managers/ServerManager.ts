import { BaseManager } from './BaseManager.ts';
import { Server } from '../structures/mod.ts';
import { APIServer, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type ServerResolvable = Server | APIServer | string;

export interface CreateServerOptions {
  name: string;
}

export class ServerManager extends BaseManager<Server, APIServer> {
  holds = Server;

  fetch(server: ServerResolvable): Promise<Server>;
  fetch(): Promise<Collection<string, Server>>;
  async fetch(
    server?: ServerResolvable,
  ): Promise<Server | Collection<string, Server>> {
    if (typeof server !== 'undefined') {
      const id = this.resolveId(server);

      if (!id) {
        throw new TypeError('INVALID_TYPE', 'server', 'ServerResolvable');
      }

      const data = await this.client.api.get(`/servers/${id}`);

      return this.add(data);
    }

    const data = await this.client.api.get('/servers');

    return data.reduce((cur, prev) => {
      const server = this.add(prev);
      cur.set(server.id, server);
      return cur;
    }, new Collection<string, Server>());
  }

  async delete(server: ServerResolvable): Promise<void> {
    const id = this.resolveId(server);
    if (!id) throw new TypeError('INVALID_TYPE', 'server', 'ServerResolvable');
    await this.client.api.delete(`/servers/${id}`);
  }

  async create(options: CreateServerOptions): Promise<Server> {
    const data = await this.client.api.post(`/servers`, { body: options });
    return this.add(data);
  }
}
