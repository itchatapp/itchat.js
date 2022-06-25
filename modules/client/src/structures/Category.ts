import { ChannelType, ServerChannel } from './ServerChannel.ts';

export class Category extends ServerChannel {
  readonly type = ChannelType.Category;
}
