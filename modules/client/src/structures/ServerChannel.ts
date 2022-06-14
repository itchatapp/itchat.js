import { Channel } from './Channel.ts'
import { APIChannel } from '../deps.ts'
import type { Server } from './mod.ts'

export abstract class ServerChannel extends Channel {
    name!: string
    serverId!: string

    protected _patch(data: APIChannel): this {
        if (data.name) this.name = data.name
        if (data.server_id) this.serverId = data.server_id + ''
        return this
    }

    get server(): Server {
        return this.client.servers.cache.get(this.serverId)!
    }
}