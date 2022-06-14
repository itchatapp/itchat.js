import { ServerChannel } from './ServerChannel.ts';
import { TextBasedChannel } from './interfaces/mod.ts'
import { MessageManager } from '../managers/mod.ts'

export class TextChannel extends ServerChannel implements TextBasedChannel {
    readonly type = 'Text'
    readonly messages = new MessageManager(this)
}
