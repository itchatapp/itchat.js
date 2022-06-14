import { Base } from './Base.ts';
import { APIChannelTypes } from '../deps.ts'
import type { TextChannel, GroupChannel, VoiceChannel, DMChannel, ServerChannel } from './mod.ts'

export abstract class Channel extends Base {
  type: APIChannelTypes = 'Unknown'

  isText(): this is TextChannel | GroupChannel | DMChannel {
    return 'messages' in this;
  }

  isVoice(): this is VoiceChannel {
    return this.type === 'Voice'
  }

  isGroup(): this is GroupChannel {
    return this.type === 'Group'
  }

  inServer(): this is ServerChannel {
    return 'serverId' in this;
  }

  toString(): string {
    return `<#${this.id}>`;
  }
}
