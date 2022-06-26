import type { Client } from './mod.ts';
import { ChannelType, ServerChannel } from './ServerChannel.ts';
import { APIChannel } from '../deps.ts';

type APIVoiceChannel = Pick<
  APIChannel,
  'name' | 'server_id' | 'id' | 'type' | 'overwrites'
>;

export class VoiceChannel extends ServerChannel {
  readonly type = ChannelType.Voice;

  constructor(client: Client, data: APIVoiceChannel) {
    super(client);
    this._patch(data);
  }
}
