import { Action, Events } from './Action.ts';
import type { APIServer } from '../deps.ts';

export class ServerUpdateAction extends Action {
  handle(data: APIServer) {
    const server = this.client.servers.cache.get(data.id + '');
    const oldServer = server?._update(data);

    if (oldServer && server && !oldServer.equals(server)) {
      this.client.emit(Events.SERVER_UPDATE, oldServer, server);
    }
  }
}
