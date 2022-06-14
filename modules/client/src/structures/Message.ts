import { Base, Client } from './Base.ts'
import { APIMessage } from '../../deps.ts'
import type { Channel } from './mod.ts'

export class Message extends Base {
    content = ''
    authorId!: string
    channelId!: string
    editedTimestamp: number | null = null;

    constructor(client: Client, data: APIMessage) {
        super(client, data)
        this._patch(data)
    }

    protected _patch(data: APIMessage): this {
        if (data.content) this.content = data.content
        if (data.author_id) this.authorId = data.author_id + ''
        if (data.channel_id) this.channelId = data.channel_id + ''
        if (data.edited_at) this.editedTimestamp = data.edited_at
        return this
    }

    get editedAt(): Date | null {
        return this.editedTimestamp ? new Date(this.editedTimestamp) : null
    }

    get channel(): Channel {
        return this.client.channels.cache.get(this.channelId)!
    }

    toString(): string {
        return this.content
    }
}