import type { Client } from './mod.ts';
import { ChannelType, ServerChannel } from './ServerChannel.ts';
import { APIChannel } from '../deps.ts';

type APICategory = Pick<
  APIChannel,
  'name' | 'server_id' | 'id' | 'type' | 'overwrites'
>;

export class Category extends ServerChannel {
  readonly type = ChannelType.Category;

  constructor(client: Client, data: APICategory) {
    super(client);
    this._patch(data);
  }
}
