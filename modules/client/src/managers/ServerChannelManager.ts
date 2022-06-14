import { BaseManager } from './BaseManager.ts'
import { Server, ServerChannel } from '../structures/mod.ts'
import { APIChannel } from '../../deps.ts'

export class ServerChannelManager extends BaseManager<ServerChannel, APIChannel> {
    holds = null
    constructor(public readonly server: Server) {
        super(server.client)
    }
}