import { BaseManager } from './BaseManager.ts';
import { Channel, Message } from '../structures/mod.ts';
import { APIMessage } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type MessageResolvable = Message | APIMessage | string;

export type CreateMessageOptions = string | {
  content: string;
};

export type EditMessageOptions = CreateMessageOptions;

export class MessageManager extends BaseManager<Message, APIMessage> {
  holds = Message;

  constructor(public readonly channel: Channel) {
    super(channel.client);
  }

  async fetch(message: MessageResolvable): Promise<Message> {
    const id = this.resolveId(message);

    if (!id) {
      throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    }

    const data = await this.client.api.get(
      `/channels/${this.channel.id}/messages/${id}`,
    );

    return this.add(data);
  }

  async delete(message: MessageResolvable): Promise<void> {
    const id = this.resolveId(message);

    if (!id) {
      throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    }

    await this.client.api.delete(`/channels/${this.channel.id}/messages/${id}`);
  }

  async send(options: CreateMessageOptions): Promise<Message> {
    const data = await this.client.api.post(
      `/channels/${this.channel.id}/messages`,
      {
        body: {
          content: typeof options === 'object' ? options.content : options,
        },
      },
    );
    return this.add(data);
  }

  async edit(
    message: MessageResolvable,
    options: EditMessageOptions,
  ): Promise<Message> {
    const id = this.resolveId(message);

    if (!id) {
      throw new TypeError('INVALID_TYPE', 'message', 'MessageResolvable');
    }

    const data = await this.client.api.patch(
      `/channels/${this.channel.id}/messages/${id}`,
      {
        body: {
          content: typeof options === 'object' ? options.content : options,
        },
      },
    );

    return this.add(data);
  }
}
