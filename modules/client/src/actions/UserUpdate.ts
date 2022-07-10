import { Action, Events } from './Action.ts';
import { APIUser } from '../deps.ts';

export class UserUpdateAction extends Action {
  handle(data: APIUser) {
    let user = data.id === this.client.user!.id
      ? this.client.user
      : this.client.users.cache.get(data.id);

    if (!user) {
      user = this.client.users.add(data);
    }

    const oldUser = user._update(data);

    if (user.equals(oldUser)) { // ClientUser#friends or ClientUser#blocked has updated
      this.client.emit(
        Events.USER_UPDATE,
        this.client.user!,
        this.client.user!,
      );
    } else {
      this.client.emit(Events.USER_UPDATE, oldUser, user);
    }
  }
}
