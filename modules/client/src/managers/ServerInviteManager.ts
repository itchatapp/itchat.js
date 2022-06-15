import { BaseManager } from './BaseManager.ts';
import { Invite, Server } from '../structures/mod.ts';
import { APIInvite } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type InviteResolvable = Invite | APIInvite | string;

export interface CreateServerInviteOptions {
  channelId: string;
}

export class ServerInviteManager extends BaseManager<Invite, APIInvite> {
  holds = Invite;

  constructor(public readonly server: Server) {
    super(server.client);
  }

  async create(options: CreateServerInviteOptions): Promise<Invite> {
    const data = await this.client.api.post(
      `/servers/${this.server.id}/invites`,
      { body: options },
    );
    return this.add(data);
  }

  async delete(invite: InviteResolvable): Promise<void> {
    const id = this.resolveId(invite);
    if (!id) throw new TypeError('INVALID_TYPE', 'invite', 'InviteResolvable');
    await this.client.api.delete(`/servers/${this.server.id}/invites/${id}`);
  }
}
