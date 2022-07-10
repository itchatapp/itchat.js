import { User } from './User.ts';
import { Collection } from '../deps.ts';

export class ClientUser extends User {
  readonly friends = new Collection<string, User>();
  readonly blocked = new Collection<string, User>();
}
