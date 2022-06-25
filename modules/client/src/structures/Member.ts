import { Base, Client } from './Base.ts';
import { APIMember } from '../deps.ts';
import type { Server, User } from './mod.ts';

export class Member extends Base {
  nickname: string | null = null;
  serverId!: string;
  joinedTimestamp!: number;

  constructor(client: Client, data: APIMember) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIMember): this {
    super._patch(data);
    if ('nickname' in data) this.nickname = data.nickname ?? null;
    if (data.server_id) this.serverId = data.server_id + '';
    if (data.joined_at) this.joinedTimestamp = data.joined_at;
    return this;
  }

  get user(): User {
    return this.client.users.cache.get(this.id)!;
  }

  get server(): Server {
    return this.client.servers.cache.get(this.serverId)!;
  }

  get joinedAt(): Date {
    return new Date(this.joinedTimestamp);
  }

  toString(): string {
    return this.nickname ?? this.user?.username;
  }
}
