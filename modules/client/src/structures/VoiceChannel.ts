import { ChannelType, ServerChannel } from './ServerChannel.ts';

export class VoiceChannel extends ServerChannel {
  readonly type = ChannelType.Voice;
}
