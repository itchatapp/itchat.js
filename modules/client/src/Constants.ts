import type { ClientOptions } from './BaseClient.ts';

// TODO:
// export enum WSEvents {}

export enum Events {
  DEBUG = 'debug',
  ERROR = 'error',
}

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  ws: {},
  rest: {
    api: 'https://api.itchat.world',
    app: 'https://app.itchat.world',
    cdn: 'https://cdn.itchat.world',
    timeout: 15_000,
    retries: 3,
  },
};
