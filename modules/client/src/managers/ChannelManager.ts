import { BaseManager } from './BaseManager.ts'
import { Channel } from '../structures/mod.ts'
import { APIChannel } from '../../deps.ts'

export class ChannelManager extends BaseManager<Channel, APIChannel> {
    holds = null
}