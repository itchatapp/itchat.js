import { Base, Client } from './Base.ts';
import { APIInvite } from '../deps.ts';
import type { Channel, Server, User } from './mod.ts';

export class Invite extends Base {
  code!: string;
  inviterId!: string;
  channelId!: string;
  serverId: string | null = null;
  uses = 0;

  constructor(client: Client, data: APIInvite) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIInvite): this {
    super._patch(data);
    if (data.channel_id) this.channelId = data.channel_id;
    if (data.code) this.code = data.code;
    if (data.inviter_id) this.inviterId = data.inviter_id;
    if (data.server_id) this.serverId = data.server_id;
    if (data.uses) this.uses = data.uses;
    return this;
  }

  get inviter(): User {
    return this.client.users.cache.get(this.inviterId)!;
  }

  get server(): Server | null {
    return this.client.servers.cache.get(this.serverId!) ?? null;
  }

  get channel(): Channel {
    return this.client.channels.cache.get(this.channelId)!;
  }
}
