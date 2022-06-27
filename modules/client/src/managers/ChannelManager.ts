import { BaseManager } from './BaseManager.ts';
import {
  Category,
  Channel,
  ChannelType,
  DMChannel,
  GroupChannel,
  TextChannel,
  VoiceChannel,
} from '../structures/mod.ts';
import { APIChannel, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type ChannelResolvable = Channel | APIChannel | string;

export class ChannelManager extends BaseManager<Channel, APIChannel> {
  holds = null;

  add(data: APIChannel): Channel {
    let channel: Channel;

    switch (data.type) {
      case ChannelType.Direct:
        channel = new DMChannel(this.client, data);
        break;
      case ChannelType.Group:
        channel = new GroupChannel(this.client, data);
        break;
      case ChannelType.Text:
        channel = new TextChannel(this.client, data);
        break;
      case ChannelType.Voice:
        channel = new VoiceChannel(this.client, data);
        break;
      case ChannelType.Category:
        channel = new Category(this.client, data);
        break;
      default:
        throw new Error(`Unknown chanel type: ${data.type}`);
    }

    if (channel.inServer()) {
      channel.server.channels.cache.set(channel.id, channel);
    }

    this.cache.set(channel.id, channel);

    return channel;
  }

  remove(id: string): void {
    const channel = this.cache.get(id);

    if (channel?.inServer()) {
      channel.server.channels.remove(id);
    }

    super.remove(id);
  }

  fetch(): Promise<Collection<string, Channel>>;
  fetch(channel: ChannelResolvable): Promise<Channel>;
  async fetch(
    channel?: ChannelResolvable,
  ): Promise<Channel | Collection<string, Channel>> {
    if (typeof channel !== 'undefined') {
      const id = this.resolveId(channel);

      if (!id) {
        throw new TypeError('INVALID_TYPE', 'channel', 'ChannelResolvable');
      }

      const data = await this.client.api.get(`/channels/${id}`);

      return this.add(data);
    }

    const data = await this.client.api.get('/channels');

    return data.reduce((cur, prev) => {
      const channel = this.add(prev);
      cur.set(channel.id, channel);
      return cur;
    }, new Collection<string, Channel>());
  }

  async delete(channel: ChannelResolvable): Promise<void> {
    const id = this.resolveId(channel);

    if (!id) {
      throw new TypeError('INVALID_TYPE', 'channel', 'ChannelResolvable');
    }

    await this.client.api.delete(`/channels/${id}`);
  }

  async create(name: string) {
    const data = await this.client.api.post('/channels', {
      body: {
        name,
      },
    });
    return this.add(data);
  }
}
