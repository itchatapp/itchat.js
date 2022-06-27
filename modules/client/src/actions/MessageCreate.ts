import { Action, Events } from './Action.ts';
import type { APIMessage } from '../deps.ts';

export class MessageAction extends Action {
  handle(data: APIMessage) {
    const channel = this.client.channels.cache.get(data.channel_id);

    if (channel?.isText()) {
      this.client.emit(Events.MESSAGE_CREATE, channel.messages.add(data));
    }
  }
}
