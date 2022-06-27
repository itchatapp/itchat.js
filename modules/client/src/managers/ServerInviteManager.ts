import { BaseManager } from './BaseManager.ts';
import { Invite, Server } from '../structures/mod.ts';
import { APIInvite, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type InviteResolvable = Invite | APIInvite | string;

export class ServerInviteManager extends BaseManager<Invite, APIInvite> {
  holds = Invite;

  constructor(public readonly server: Server) {
    super(server.client);
  }

  fetch(): Promise<Collection<string, Invite>>;
  fetch(invite: InviteResolvable): Promise<Invite>;
  async fetch(
    invite?: InviteResolvable,
  ): Promise<Invite | Collection<string, Invite>> {
    if (typeof invite !== 'undefined') {
      const id = this.resolveId(invite);

      if (!id) {
        throw new TypeError('INVALID_TYPE', 'invite', 'InviteResolvable');
      }

      const data = await this.client.api.get(
        `/servers/${this.server.id}/invites/${id}`,
      );

      return this.add(data);
    }

    const data = await this.client.api.get(
      `/servers/${this.server.id}/invites`,
    );

    return data.reduce((cur, prev) => {
      const invite = this.add(prev);
      cur.set(invite.id, invite);
      return cur;
    }, new Collection<string, Invite>());
  }

  async delete(invite: InviteResolvable): Promise<void> {
    const id = this.resolveId(invite);
    if (!id) throw new TypeError('INVALID_TYPE', 'invite', 'InviteResolvable');
    await this.client.api.delete(`/servers/${this.server.id}/invites/${id}`);
  }
}
