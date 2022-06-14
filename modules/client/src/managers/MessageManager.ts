import { BaseManager } from './BaseManager.ts'
import { Message, Channel } from '../structures/mod.ts'
import { APIMessage } from '../deps.ts'

export class MessageManager extends BaseManager<Message, APIMessage> {
    holds = Message

    constructor(public readonly channel: Channel) {
        super(channel.client)
    }
}