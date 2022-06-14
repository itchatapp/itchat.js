import { BaseManager } from './BaseManager.ts';
import { User } from '../structures/mod.ts';
import { APIUser } from '../deps.ts'

export type UserResolvable = User | APIUser | string

export class UserManager extends BaseManager<User, APIUser> {
  holds = User;

  async fetch(user: UserResolvable): Promise<User> {
    const id = this.resolveId(user)
    if (!id) throw new TypeError('Invalid Id')
    const data = await this.client.api.get(`/users/${id}`)
    return this.add(data)
  }
}
