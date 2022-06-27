import { Action, Events } from './Action.ts';
import type { APIServer } from '../deps.ts';

export class ServerCreateAction extends Action {
  async handle(data: APIServer) {
    const server = this.client.servers.add(data);

    await Promise.all([
      server.channels.fetch(),
      server.roles.fetch(),
    ]);

    this.client.emit(Events.SERVER_CREATE, server);
  }
}
