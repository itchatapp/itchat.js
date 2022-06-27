import { Action, Events } from './Action.ts';
import { APIRole } from '../deps.ts';

export class RoleCreateAction extends Action {
  handle(data: APIRole) {
    const server = this.client.servers.cache.get(data.server_id);

    if (server) {
      const role = server.roles.add(data);
      this.client.emit(Events.ROLE_CREATE, role);
    }
  }
}
