import { Client, User } from './mod.ts'
import { Channel } from './Channel.ts';
import { TextBasedChannel } from './interfaces/mod.ts'
import { MessageManager } from '../managers/mod.ts'
import { APIChannel } from '../../deps.ts'

type APIDMChannel = Pick<APIChannel, 'recipients'>

export class DMChannel extends Channel implements TextBasedChannel {
    readonly type = 'Direct'
    readonly messages = new MessageManager(this)
    recipientId!: string

    constructor(client: Client, data: APIDMChannel) {
        super(client, data)
    }

    protected _patch(data: APIDMChannel): this {
        if (data.recipients?.length) this.recipientId = data.recipients[0] + ''
        return this
    }

    get recipient(): User {
        return this.client.users.cache.get(this.recipientId)!
    }
}
