import { Base, Client } from './Base.ts';
import { APIUser, Badges } from '../deps.ts';

export class User extends Base {
  username!: string;
  avatar: string | null = null;
  badges = new Badges();

  constructor(client: Client, data: APIUser) {
    super(client, data);
    this._patch(data);
  }

  protected _patch(data: APIUser): this {
    if (data.username) this.username = data.username;
    if ('avatar' in data) this.avatar = data.avatar ?? null;
    if ('badges' in data) this.badges.set(BigInt(data.badges));
    return this;
  }
}
