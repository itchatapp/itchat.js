import type { ClientOptions } from './BaseClient.ts';

export enum WSEvents {
  AUTHENTICATE = 'Authenticate',
  AUTHENTICATED = 'Authenticated',
  CHANNEL_CREATE = 'ChannelCreate',
  CHANNEL_DELETE = 'ChannelDelete',
  CHANNEL_UPDATE = 'ChannelUpdate',
  ERROR = 'Error',
  MESSAGE_CREATE = 'Message',
  MESSAGE_DELETE = 'MessageDelete',
  MESSAGE_UPDATE = 'MessageUpdate',
  PING = 'Ping',
  PONG = 'Pong',
  READY = 'Ready',
  SERVER_CREATE = 'ServerCreate',
  SERVER_DELETE = 'ServerDelete',
  SERVER_MEMBER_JOIN = 'ServerMemberJoin',
  SERVER_MEMBER_LEAVE = 'ServerMemberLeave',
  SERVER_MEMBER_UPDATE = 'ServerMemberUpdate',
  SERVER_ROLE_CREATE = 'RoleCreate',
  SERVER_ROLE_DELETE = 'RoleDelete',
  SERVER_ROLE_UPDATE = 'RoleUpdate',
  SERVER_UPDATE = 'ServerUpdate',
  USER_UPDATE = 'UserUpdate',
}

export enum Events {
  CHANNEL_CREATE = 'channelCreate',
  CHANNEL_DELETE = 'channelDelete',
  CHANNEL_UPDATE = 'channelUpdate',
  DEBUG = 'debug',
  ERROR = 'error',
  MESSAGE_CREATE = 'messageCreate',
  MESSAGE_DELETE = 'messageDelete',
  MESSAGE_UPDATE = 'messageUpdate',
  RAW = 'raw',
  READY = 'ready',
  ROLE_CREATE = 'roleCreate',
  ROLE_DELETE = 'roleDelete',
  ROLE_UPDATE = 'roleUpdate',
  SERVER_CREATE = 'serverCreate',
  SERVER_DELETE = 'serverDelete',
  SERVER_UPDATE = 'serverUpdate',
  SERVER_MEMBER_JOIN = 'serverMemberJoin',
  SERVER_MEMBER_LEAVE = 'serverMemberLeave',
  SERVER_MEMBER_UPDATE = 'serverMemberUpdate',
  USER_UPDATE = 'userUpdate',
}

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  ws: {
    url: 'wss://api.itchat.world/ws',
    heartbeat: 0,
    reconnect: true,
  },
  rest: {
    api: 'https://api.itchat.world',
    app: 'https://app.itchat.world',
    cdn: 'https://cdn.itchat.world',
    timeout: 15_000,
    retries: 3,
  },
};
