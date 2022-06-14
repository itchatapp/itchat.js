import { BaseManager } from './BaseManager.ts'
import { Channel, GroupChannel, DMChannel } from '../structures/mod.ts'
import { APIChannel, Collection } from '../deps.ts'

export type ChannelResolvable = Channel | APIChannel | string

export class ChannelManager extends BaseManager<Channel, APIChannel> {
    holds = null

    add(data: APIChannel): Channel {
        let channel: Channel;

        switch (data.type) {
            case 'Direct': channel = new DMChannel(this.client, data); break
            case 'Group': channel = new GroupChannel(this.client, data); break
            default: throw new Error(`Unknown chanel type: ${data.type}`)
        }

        this.cache.set(channel.id, channel);
        return channel
    }

    fetch(): Promise<Collection<string, Channel>>
    fetch(channel: ChannelResolvable): Promise<Channel>
    async fetch(channel?: ChannelResolvable): Promise<Channel | Collection<string, Channel>> {
        const id = this.resolveId(channel!)

        if (id) {
            const data = await this.client.api.get(`/channels/${id}`)
            return this.add(data)
        }

        const data = await this.client.api.get('/channels')

        return data.reduce((cur, prev) => {
            const channel = this.add(prev)
            cur.set(channel.id, channel)
            return cur
        }, new Collection<string, Channel>())
    }
}