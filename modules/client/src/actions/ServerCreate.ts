import { Action, Events } from './Action.ts';
import type { APIServer } from '../deps.ts';

export class ServerCreateAction extends Action {
  handle(data: APIServer) {
    this.client.emit(Events.SERVER_CREATE, this.client.servers.add(data));
  }
}
