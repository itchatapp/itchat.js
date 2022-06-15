import type {
  CreateMessageOptions,
  MessageManager,
} from '../../managers/mod.ts';
import type { Message } from '../mod.ts';

export interface TextBasedChannel {
  messages: MessageManager;
  send(options: CreateMessageOptions): Promise<Message>;
}
