import { Base } from './Base.ts';
import type { GroupChannel, ServerChannel, VoiceChannel } from './mod.ts';
import type { TextBasedChannel } from './interfaces/TextBasedChannel.ts';

export enum ChannelType {
  Unknown = 0,
  Direct = 1,
  Group = 2,
  Category = 3,
  Text = 4,
  Voice = 5,
}

export abstract class Channel extends Base {
  type = ChannelType.Unknown;

  isText(): this is this & TextBasedChannel {
    return 'messages' in this;
  }

  isVoice(): this is VoiceChannel {
    return this.type === ChannelType.Voice;
  }

  isGroup(): this is GroupChannel {
    return this.type === ChannelType.Group;
  }

  inServer(): this is ServerChannel {
    return 'serverId' in this;
  }

  toString(): string {
    return `<#${this.id}>`;
  }
}
