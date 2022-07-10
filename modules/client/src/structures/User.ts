import { Base, Client } from './Base.ts';
import { DMChannel } from './mod.ts';
import { APIUser, Badges } from '../deps.ts';

export enum RelationshipStatus {
  Friend = 0,
  Incoming = 1,
  Outgoing = 2,
  Blocked = 3,
  BlockedByOther = 4,
}

export class User extends Base {
  username!: string;
  avatar: string | null = null;
  badges = new Badges();
  relationship!: RelationshipStatus;

  constructor(client: Client, data: APIUser) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIUser): this {
    super._patch(data);

    if (data.username) this.username = data.username;
    if ('avatar' in data) this.avatar = data.avatar ?? null;
    if ('badges' in data) this.badges.set(BigInt(data.badges));
    if ('relationship' in data) this.relationship = data.relationship;

    if (data.relationship == RelationshipStatus.Friend) {
      this.client.user!.friends.set(this.id, this);
    } else if (data.relationship == RelationshipStatus.Blocked) {
      this.client.user!.blocked.set(this.id, this);
    }

    return this;
  }

  createDM(): Promise<DMChannel> {
    return this.client.users.createDM(this);
  }
}
