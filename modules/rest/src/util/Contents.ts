import type { RESTOptions } from '../REST.ts';

export const DEFAULT_REST_OPTIONS: RESTOptions = {
  app: 'https://app.itchat.world',
  api: 'https://api.itchat.world',
  cdn: 'https://cdn.itchat.world',
  retries: 3,
  timeout: 15_000,
};
