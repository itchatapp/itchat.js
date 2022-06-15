import { Base } from './Base.ts';
import { APIChannelTypes } from '../deps.ts';
import type { GroupChannel, ServerChannel, VoiceChannel } from './mod.ts';
import type { TextBasedChannel } from './interfaces/TextBasedChannel.ts';

export abstract class Channel extends Base {
  type: APIChannelTypes = 'Unknown';

  isText(): this is this & TextBasedChannel {
    return 'messages' in this;
  }

  isVoice(): this is VoiceChannel {
    return this.type === 'Voice';
  }

  isGroup(): this is GroupChannel {
    return this.type === 'Group';
  }

  inServer(): this is ServerChannel {
    return 'serverId' in this;
  }

  toString(): string {
    return `<#${this.id}>`;
  }
}
