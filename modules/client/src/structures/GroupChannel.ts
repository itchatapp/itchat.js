import { Channel, ChannelType, Overwrite, OverwriteType } from './Channel.ts';
import type { Client, User } from './mod.ts';
import { TextBasedChannel } from './interfaces/mod.ts';
import { CreateMessageOptions, MessageManager } from '../managers/mod.ts';
import { APIChannel, Collection, Permissions } from '../deps.ts';

type APIGroupChannel = Pick<
  APIChannel,
  | 'id'
  | 'recipients'
  | 'owner_id'
  | 'topic'
  | 'name'
  | 'overwrites'
  | 'permissions'
>;

export class GroupChannel extends Channel implements TextBasedChannel {
  readonly type = ChannelType.Group;
  readonly messages: MessageManager = new MessageManager(this);
  name!: string;
  topic: string | null = null;
  ownerId!: string;
  overwrites = new Collection<string, Overwrite>();
  permissions = new Permissions();
  _recipients: string[] = [];

  constructor(client: Client, data: APIGroupChannel) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIGroupChannel): this {
    super._patch(data);
    if (data.name) this.name = data.name;
    if (data.owner_id) this.ownerId = data.owner_id;
    if ('topic' in data) this.topic = data.topic ?? null;
    if (data.recipients) this._recipients = [...data.recipients];
    if (data.permissions != null) {
      this.permissions.set(BigInt(data.permissions));
    }
    if (data.overwrites) {
      this.overwrites = data.overwrites.reduce((coll, cur) => {
        coll.set(cur.id, {
          id: cur.id,
          type: OverwriteType[
            OverwriteType[cur.type] as keyof typeof OverwriteType
          ],
          allow: new Permissions(BigInt(cur.allow)),
          deny: new Permissions(BigInt(cur.deny)),
        });
        return coll;
      }, new Collection<string, Overwrite>());
    }

    return this;
  }

  get owner(): User {
    return this.client.users.cache.get(this.ownerId)!;
  }

  get recipients(): Collection<string, User> {
    return this._recipients.reduce((coll, cur) => {
      const user = this.client.users.cache.get(cur);
      if (user) coll.set(user.id, user);
      return coll;
    }, new Collection<string, User>());
  }

  send(options: CreateMessageOptions) {
    return this.messages.send(options);
  }

  toString(): string {
    return this.name;
  }
}
