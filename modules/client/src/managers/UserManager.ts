import { BaseManager } from './BaseManager.ts';
import { DMChannel, User } from '../structures/mod.ts';
import { APIUser, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type UserResolvable = User | APIUser | string;

export class UserManager extends BaseManager<User, APIUser> {
  holds = User;

  async createDM(user: UserResolvable): Promise<DMChannel> {
    const id = this.resolveId(user);

    if (!id) throw new TypeError('INVALID_TYPE', 'user', 'UserResolvable');

    const data = await this.client.api.get(`/users/${id}/dm`);

    return this.client.channels.add(data) as DMChannel;
  }

  fetch(): Promise<Collection<string, User>>;
  fetch(user: UserResolvable): Promise<User>;
  async fetch(user?: UserResolvable): Promise<User | Collection<string, User>> {
    if (typeof user === 'undefined') {
      const data = await this.client.api.get('/users');
      return data.reduce((cur, prev) => {
        const user = this.add(prev);
        cur.set(user.id, user);
        return cur;
      }, new Collection<string, User>());
    }

    const id = this.resolveId(user);

    if (!id) throw new TypeError('INVALID_TYPE', 'user', 'UserResolvable');

    const data = await this.client.api.get(`/users/${id}`);

    return this.add(data);
  }
}
