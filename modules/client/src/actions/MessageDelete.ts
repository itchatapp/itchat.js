import { Action, Events } from './Action.ts';

export class MessageDeleteAction extends Action {
  handle(data: { id: string; channel_id: string }) {
    const channel = this.client.channels.cache.get(data.channel_id + '');
    const message = channel?.isText()
      ? channel.messages.cache.get(data.id)
      : null;

    if (channel && message) {
      this.client.emit(Events.MESSAGE_DELETE, message);
    }
  }
}
