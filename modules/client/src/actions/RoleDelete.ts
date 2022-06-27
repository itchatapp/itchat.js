import { Action, Events } from './Action.ts';

export class RoleDeleteAction extends Action {
  handle(data: { id: string; server_id: string }) {
    const server = this.client.servers.cache.get(data.server_id);
    const role = server?.roles.cache.get(data.id);

    if (server && role) {
      server.roles.remove(data.id);
      this.client.emit(Events.ROLE_DELETE, role);
    }
  }
}
