import type { ClientOptions } from './BaseClient.ts';

export enum WSEvents {
  AUTHENTICATE = 'Authenticate',
  AUTHENTICATED = 'Authenticated',
  CHANNEL_CREATE = 'ChannelCreate',
  CHANNEL_DELETE = 'ChannelDelete',
  GROUP_USER_JOIN = 'GroupUserJoin',
  GROUP_USER_LEAVE = 'GroupUserLeave',
  CHANNEL_UPDATE = 'ChannelUpdate',
  END_TYPING = 'EndTyping',
  ERROR = 'Error',
  MESSAGE = 'Message',
  MESSAGE_DELETE = 'MessageDelete',
  MESSAGE_UPDATE = 'MessageUpdate',
  PING = 'Ping',
  PONG = 'Pong',
  READY = 'Ready',
  SERVER_DELETE = 'ServerDelete',
  SERVER_MEMBER_JOIN = 'ServerMemberJoin',
  SERVER_MEMBER_LEAVE = 'ServerMemberLeave',
  SERVER_MEMBER_UPDATE = 'ServerMemberUpdate',
  SERVER_ROLE_DELETE = 'RoleDelete',
  SERVER_ROLE_UPDATE = 'RoleUpdate',
  SERVER_ROLE_CREATE = 'RoleCreate',
  SERVER_UPDATE = 'ServerUpdate',
  USER_UPDATE = 'UserUpdate',
}

export enum Events {
  DEBUG = 'debug',
  ERROR = 'error',
  RAW = 'raw',
  READY = 'ready',
  CHANNEL_CREATE = 'channelCreate',
  CHANNEL_DELETE = 'channelDelete',
  MESSAGE_CREATE = 'message',
  MESSAGE_DELETE = 'messageDelete',
  SERVER_CREATE = 'serverCreate',
  SERVER_DELETE = 'serverDelete',
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
