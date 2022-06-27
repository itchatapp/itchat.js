import { Action, Events } from './Action.ts';
import { APIMember } from '../deps.ts';

export class ServerMemberJoinAction extends Action {
  handle(data: APIMember) {
    const server = this.client.servers.cache.get(data.server_id);

    if (server) {
      this.client.emit(Events.SERVER_MEMBER_JOIN, server.members.add(data));
    }
  }
}
