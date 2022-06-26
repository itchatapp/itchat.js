import { Action, Events } from './Action.ts';

export class ChannelDeleteAction extends Action {
  handle(data: { id: string; server_id?: string }) {
    const channel = this.client.channels.cache.get(data.id);

    if (channel) {
      this.client.channels.remove(data.id);
      this.client.emit(Events.CHANNEL_DELETE, channel);
    }
  }
}
