import { Action, Events } from './Action.ts';
import { APIMember } from '../deps.ts';

export class ServerMemberUpdateAction extends Action {
  handle(data: APIMember) {
    const server = this.client.servers.cache.get(data.server_id);
    const member = server?.members.cache.get(data.id);
    const oldMember = member?._update(data);

    if (oldMember && member && !member.equals(oldMember)) {
      this.client.emit(Events.SERVER_MEMBER_UPDATE, oldMember, member);
    }
  }
}
