import { Base, Client } from './Base.ts';
import { APIMember, Collection } from '../deps.ts';
import type { Role, Server, User } from './mod.ts';
import type { EditServerMemberOptions } from '../managers/mod.ts';

export class Member extends Base {
  nickname: string | null = null;
  serverId!: string;
  joinedTimestamp!: number;
  _roles: string[] = [];

  constructor(client: Client, data: APIMember) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIMember): this {
    super._patch(data);
    if ('nickname' in data) this.nickname = data.nickname ?? null;
    if (data.server_id) this.serverId = data.server_id;
    if (data.joined_at) this.joinedTimestamp = Date.parse(data.joined_at);
    if (data.roles) this._roles = [...data.roles];
    return this;
  }

  get user(): User {
    return this.client.users.cache.get(this.id)!;
  }

  get server(): Server {
    return this.client.servers.cache.get(this.serverId)!;
  }

  get roles(): Collection<string, Role> {
    const roles = this.server.roles.cache;
    return this._roles.reduce((coll, cur) => {
      const role = roles.get(cur);
      if (role) coll.set(role.id, role);
      return coll;
    }, new Collection<string, Role>());
  }

  get joinedAt(): Date {
    return new Date(this.joinedTimestamp);
  }

  edit(options: EditServerMemberOptions): Promise<Member> {
    return this.server.members.edit(this, options);
  }

  kick(): Promise<void> {
    return this.server.members.kick(this);
  }

  toString(): string {
    return this.nickname ?? this.user?.username;
  }
}
