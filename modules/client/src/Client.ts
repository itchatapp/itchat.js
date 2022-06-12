import { BaseClient } from './BaseClient.ts';
import { ServerManager, UserManager } from './managers/mod.ts';
import { ActionManager } from './actions/ActionManager.ts';

export class Client extends BaseClient {
  readonly actions = new ActionManager(this);
  readonly users = new UserManager(this);
  readonly servers = new ServerManager(this);
  login(_token: string): Promise<void> {
    throw new Error('Not yet implemented');
  }
}
