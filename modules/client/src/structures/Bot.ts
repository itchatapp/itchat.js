import { Base, Client } from './Base.ts';
import { APIBot } from '../deps.ts';
import type { User } from './mod.ts';

export class Bot extends Base {
  username!: string;
  ownerId!: string;

  constructor(client: Client, data: APIBot) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIBot): this {
    super._patch(data);

    if (data.username) this.username = data.username;
    if (data.owner_id) this.ownerId = data.owner_id;

    return this;
  }

  get owner(): User | null {
    return this.client.users.cache.get(this.ownerId) ?? null;
  }

  async delete(): Promise<void> {
    // TODO:
    // return this.client.bots.delete(this)
  }

  toString(): string {
    return this.username;
  }
}
