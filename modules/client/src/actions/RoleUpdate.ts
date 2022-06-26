import { Action, Events } from './Action.ts';
import { APIRole } from '../deps.ts';

export class RoleUpdateAction extends Action {
  handle(data: APIRole) {
    const server = this.client.servers.cache.get(data.server_id + '');
    const role = server?.roles.cache.get(data.id + '');
    const oldRole = role?._update(data);

    if (server && oldRole && role?.equals(oldRole)) {
      this.client.emit(Events.ROLE_UPDATE, oldRole, role);
    }
  }
}
