import type { MessageManager } from '../../managers/mod.ts'

export interface TextBasedChannel {
    messages: MessageManager
}