import { BaseManager } from './BaseManager.ts';
import { Server } from '../structures/mod.ts';
import { APIServer, Collection } from '../deps.ts'

export type ServerResolvable = Server | APIServer | string

export class ServerManager extends BaseManager<Server, APIServer> {
  holds = Server;


  fetch(server: ServerResolvable): Promise<Server>
  fetch(): Promise<Collection<string, Server>>
  async fetch(server?: ServerResolvable): Promise<Server | Collection<string, Server>> {
    const id = this.resolveId(server!)

    if (id) {
      const data = await this.client.api.get(`/servers/${id}`)
      return this.add(data)
    }

    const data = await this.client.api.get('/servers')

    return data.reduce((cur, prev) => {
      const server = this.add(prev)
      cur.set(server.id, server)
      return cur
    }, new Collection<string, Server>())
  }
}
