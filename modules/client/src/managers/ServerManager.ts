import { BaseManager } from './BaseManager.ts';
import { Server } from '../structures/mod.ts';

export class ServerManager extends BaseManager<Server, { id: string }> {
  holds = Server;
}
