import { Action, Events } from './Action.ts';
import { APIUser } from '../deps.ts';

export class UserUpdateAction extends Action {
  handle(data: APIUser) {
    const user = data.id === this.client.user!.id
      ? this.client.user
      : this.client.users.cache.get(data.id);

    const oldUser = user?._update(data);

    if (user && oldUser && !user.equals(oldUser)) {
      this.client.emit(Events.USER_UPDATE, oldUser, user);
    }
  }
}
