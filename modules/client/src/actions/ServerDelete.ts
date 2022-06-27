import { Action, Events } from './Action.ts';

export class ServerDeleteAction extends Action {
  handle(data: { id: string }) {
    const server = this.client.servers.cache.get(data.id);

    if (server) {
      this.client.servers.remove(data.id);
      this.client.emit(Events.SERVER_DELETE, server);
    }
  }
}
