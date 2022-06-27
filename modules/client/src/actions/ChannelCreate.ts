import { Action, Events } from './Action.ts';
import type { APIChannel } from '../deps.ts';

export class ChannelCreateAction extends Action {
  handle(data: APIChannel) {
    this.client.emit(Events.CHANNEL_CREATE, this.client.channels.add(data));
  }
}
