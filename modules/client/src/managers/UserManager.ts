import { BaseManager } from './BaseManager.ts';
import { User } from '../structures/mod.ts';
import { APIUser } from '../../deps.ts'

export class UserManager extends BaseManager<User, APIUser> {
  holds = User;
}
