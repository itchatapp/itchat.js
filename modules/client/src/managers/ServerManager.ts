import { BaseManager } from './BaseManager.ts';
import { Server } from '../structures/mod.ts';
import { APIServer } from '../../deps.ts'

export class ServerManager extends BaseManager<Server, APIServer> {
  holds = Server;
}
