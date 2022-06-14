import { BaseManager } from './BaseManager.ts'
import { Server, ServerChannel, TextChannel, VoiceChannel, Category } from '../structures/mod.ts'
import { APIChannel, Collection } from '../deps.ts'

export type ServerChannelResolvable = ServerChannel | APIChannel | string

export class ServerChannelManager extends BaseManager<ServerChannel, APIChannel> {
    holds = null
    constructor(public readonly server: Server) {
        super(server.client)
    }

    add(data: APIChannel): ServerChannel {
        let channel: ServerChannel;

        switch (data.type) {
            case 'Text': channel = new TextChannel(this.client, data); break
            case 'Voice': channel = new VoiceChannel(this.client, data); break
            case 'Category': channel = new Category(this.client, data); break
            default: throw new Error(`Unknown chanel type: ${data.type}`)
        }

        this.cache.set(channel.id, channel);
        return channel
    }


    fetch(): Promise<Collection<string, ServerChannel>>
    fetch(channel: ServerChannelResolvable): Promise<ServerChannel>
    async fetch(channel?: ServerChannelResolvable): Promise<ServerChannel | Collection<string, ServerChannel>> {
        const id = this.resolveId(channel!)

        if (id) {
            const data = await this.client.api.get(`/servers/${this.server.id}/channels/${id}`)
            return this.add(data)
        }

        const data = await this.client.api.get(`/servers/${this.server.id}/channels`)

        return data.reduce((cur, prev) => {
            const channel = this.add(prev)
            cur.set(channel.id, channel)
            return cur
        }, new Collection<string, ServerChannel>())
    }
}