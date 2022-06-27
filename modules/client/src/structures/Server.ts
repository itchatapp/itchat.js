import { Base, Client } from './Base.ts';
import { Role } from './Role.ts';
import { APIServer } from '../deps.ts';
import {
  ServerChannelManager,
  ServerInviteManager,
  ServerMemberManager,
  ServerRoleManager,
} from '../managers/mod.ts';

export class Server extends Base {
  name!: string;
  ownerId!: string;
  description: string | null = null;
  icon: string | null = null;
  banner: string | null = null;
  readonly members = new ServerMemberManager(this);
  readonly roles = new ServerRoleManager(this);
  readonly channels = new ServerChannelManager(this);
  readonly invites = new ServerInviteManager(this);

  constructor(client: Client, data: APIServer) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIServer): this {
    super._patch(data);
    if (data.name) this.name = data.name;
    if ('description' in data) this.description = data.description ?? null;
    if (data.owner_id) this.ownerId = data.owner_id;
    if ('banner' in data) this.banner = data.banner ?? null;
    if ('icon' in data) this.icon = data.icon ?? null;
    if ('permissions' in data) {
      this.roles.cache.set(
        this.id,
        new Role(this.client, {
          id: this.id,
          server_id: this.id,
          hoist: false,
          color: 0,
          name: 'everyone',
          permissions: data.permissions,
        }),
      );
    }
    return this;
  }

  delete(): Promise<void> {
    return this.client.servers.delete(this);
  }
}
