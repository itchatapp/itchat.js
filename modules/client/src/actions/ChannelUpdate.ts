import { Action, Events } from './Action.ts';
import type { APIChannel } from '../deps.ts';

export class ChannelUpdateAction extends Action {
  async handle(data: APIChannel) {
    const channel = this.client.channels.cache.get(data.id);
    const oldChannel = channel?._update(data);

    if (channel && oldChannel && !channel.equals(oldChannel)) {
      if (
        channel.isGroup() && oldChannel.isGroup() &&
        channel._recipients.length !== oldChannel._recipients.length
      ) {
        const addedUsers = channel._recipients.filter((id) =>
          !oldChannel._recipients.includes(id)
        );
        await Promise.all(addedUsers.map((id) => this.client.users.fetch(id)));
      }
      this.client.emit(Events.CHANNEL_UPDATE, oldChannel, channel);
    }
  }
}
