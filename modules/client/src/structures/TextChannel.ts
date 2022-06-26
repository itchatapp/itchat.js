import type { Client } from './mod.ts';
import { ChannelType, ServerChannel } from './ServerChannel.ts';
import { TextBasedChannel } from './interfaces/mod.ts';
import { CreateMessageOptions, MessageManager } from '../managers/mod.ts';
import { APIChannel } from '../deps.ts';

type APITextChannel = Pick<
  APIChannel,
  'name' | 'server_id' | 'id' | 'type' | 'topic' | 'overwrites'
>;

export class TextChannel extends ServerChannel implements TextBasedChannel {
  readonly type = ChannelType.Text;
  readonly messages: MessageManager = new MessageManager(this);

  constructor(client: Client, data: APITextChannel) {
    super(client);
    this._patch(data);
  }

  send(options: CreateMessageOptions) {
    return this.messages.send(options);
  }
}
