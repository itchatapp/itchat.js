import { BaseManager } from './BaseManager.ts';
import { User } from '../structures/mod.ts';

export class UserManager extends BaseManager<User, { id: string }> {
  holds = User;
}
