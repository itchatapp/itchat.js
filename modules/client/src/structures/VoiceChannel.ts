import { ServerChannel } from './ServerChannel.ts';

export class VoiceChannel extends ServerChannel {
    readonly type = 'Voice'
}
