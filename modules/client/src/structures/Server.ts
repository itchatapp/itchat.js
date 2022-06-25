import { Base, Client } from './Base.ts';
import { APIServer, Permissions } from '../deps.ts';
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
  defaultPermissions = new Permissions();
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
    if (data.owner_id) this.ownerId = data.owner_id + '';
    if ('banner' in data) this.banner = data.banner ?? null;
    if ('icon' in data) this.icon = data.icon ?? null;
    if ('permissions' in data) {
      this.defaultPermissions.set(BigInt(data.permissions));
    }
    return this;
  }
}
