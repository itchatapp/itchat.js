import { BaseManager } from './BaseManager.ts';
import { Member, Server } from '../structures/mod.ts';
import { APIMember, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type ServerMemberResolvable = Member | APIMember | string;

export interface EditServerMemberOptions {
  nickname: string | null;
}

export class ServerMemberManager extends BaseManager<Member, APIMember> {
  holds = Member;

  constructor(public readonly server: Server) {
    super(server.client);
  }

  fetch(): Promise<Collection<string, Member>>;
  fetch(member: ServerMemberResolvable): Promise<Member>;
  async fetch(
    member?: ServerMemberResolvable,
  ): Promise<Member | Collection<string, Member>> {
    if (typeof member !== 'undefined') {
      const id = this.resolveId(member);

      if (!id) {
        throw new TypeError('INVALID_TYPE', 'member', 'ServerMemberResolvable');
      }

      const data = await this.client.api.get(
        `/servers/${this.server.id}/members/${id}`,
      );

      return this.add(data);
    }

    const data = await this.client.api.get(
      `/servers/${this.server.id}/members`,
    );

    return data.reduce((cur, prev) => {
      const member = this.add(prev);
      cur.set(member.id, member);
      return cur;
    }, new Collection<string, Member>());
  }

  async kick(member: ServerMemberResolvable): Promise<void> {
    const id = this.resolveId(member);
    if (!id) {
      throw new TypeError('INVALID_TYPE', 'member', 'ServerMemberResolvable');
    }
    await this.client.api.delete(`/servers/${this.server.id}/members/${id}`);
  }

  async edit(member: ServerMemberResolvable, options: EditServerMemberOptions) {
    const id = this.resolveId(member);
    if (!id) {
      throw new TypeError('INVALID_TYPE', 'member', 'ServerMemberResolvable');
    }
    await this.client.api.patch(`/servers/${this.server.id}/members/${id}`, {
      body: options,
    });
  }
}
