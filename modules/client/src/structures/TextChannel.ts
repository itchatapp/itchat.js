import { ServerChannel } from './ServerChannel.ts';
import { TextBasedChannel } from './interfaces/mod.ts';
import { CreateMessageOptions, MessageManager } from '../managers/mod.ts';

export class TextChannel extends ServerChannel implements TextBasedChannel {
  readonly type = 'Text';
  readonly messages: MessageManager = new MessageManager(this);

  send(options: CreateMessageOptions) {
    return this.messages.send(options);
  }
}
