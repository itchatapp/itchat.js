import { BaseClient } from './BaseClient.ts';
import { ChannelManager, ServerManager, UserManager } from './managers/mod.ts';
import { ActionManager } from './actions/ActionManager.ts';
import { ClientUser } from './structures/mod.ts';

export class Client extends BaseClient {
  readonly actions = new ActionManager(this);
  readonly users = new UserManager(this);
  readonly servers = new ServerManager(this);
  readonly channels = new ChannelManager(this);

  user: ClientUser | null = null;
  login(_token: string): Promise<void> {
    throw new Error('Not yet implemented');
  }
}
