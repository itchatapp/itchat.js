import { Channel } from './Channel.ts';
import { Client, User } from './mod.ts'
import { TextBasedChannel } from './interfaces/mod.ts'
import { MessageManager } from '../managers/mod.ts'
import { APIChannel } from '../deps.ts'

type APIGroupChannel = Pick<APIChannel, 'recipients' | 'owner_id' | 'topic' | 'name' | 'overwrites'>

export class GroupChannel extends Channel implements TextBasedChannel {
    readonly type = 'Group'
    readonly messages = new MessageManager(this)
    name!: string
    topic: string | null = null
    ownerId!: string
    // TODO:
    // recipients: string[]

    constructor(client: Client, data: APIGroupChannel) {
        super(client, data)
    }

    protected _patch(data: APIGroupChannel): this {
        if (data.name) this.name = data.name
        if (data.owner_id) this.ownerId = data.owner_id + ''
        if ('topic' in data) this.topic = data.topic ?? null
        return this
    }

    get owner(): User {
        return this.client.users.cache.get(this.ownerId)!
    }

    toString(): string {
        return this.name
    }
}
