import { Action, Events } from './Action.ts';

export class ServerMemberLeaveAction extends Action {
  handle(data: { id: string; server_id: string }) {
    const server = this.client.servers.cache.get(data.server_id + '');
    const member = server?.members.cache.get(data.id + '');

    if (server && member) {
      server.members.remove(data.id + '');
      this.client.emit(Events.SERVER_MEMBER_LEAVE, member);
    }
  }
}
