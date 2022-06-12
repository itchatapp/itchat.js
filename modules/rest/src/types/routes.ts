export type Routes = {
  path: `/auth/accounts/register`;
  parts: 3;
  method: 'POST';
  response: {
    username: string;
    badges: number;
    password: string;
    email: string;
    verified: boolean;
    id: number;
    avatar?: string;
  };
} | {
  path: `/auth/accounts/verify/${string}/${string}`;
  parts: 5;
  method: 'GET';
  response: undefined;
} | {
  path: `/auth/sessions`;
  parts: 2;
  method: 'GET';
  response: { token: string; id: number; user_id: number }[];
} | {
  path: `/auth/sessions`;
  parts: 2;
  method: 'POST';
  response: { token: string; id: number; user_id: number };
} | {
  path: `/auth/sessions/${string}`;
  parts: 3;
  method: 'GET';
  response: { token: string; id: number; user_id: number };
} | {
  path: `/auth/sessions/${string}`;
  parts: 3;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/bots`;
  parts: 1;
  method: 'GET';
  response: {
    username: string;
    verified: boolean;
    id: number;
    owner_id: number;
  }[];
} | {
  path: `/bots`;
  parts: 1;
  method: 'POST';
  response: undefined;
} | {
  path: `/bots/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    username: string;
    verified: boolean;
    id: number;
    owner_id: number;
  };
} | {
  path: `/bots/${string}`;
  parts: 2;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/channels`;
  parts: 1;
  method: 'GET';
  response: {
    topic?: string;
    name?: string;
    parent_id?: number;
    id: number;
    recipients?: number[];
    type: 'Direct' | 'Group' | 'Text' | 'Voice' | 'Category' | 'Unknown';
    server_id?: number;
    owner_id?: number;
    permissions?: number;
    overwrites?: {
      type: 'Role' | 'Member';
      allow: number;
      id: number;
      deny: number;
    }[];
  }[];
} | {
  path: `/channels`;
  parts: 1;
  method: 'POST';
  response: {
    topic?: string;
    name?: string;
    parent_id?: number;
    id: number;
    recipients?: number[];
    type: 'Direct' | 'Group' | 'Text' | 'Voice' | 'Category' | 'Unknown';
    server_id?: number;
    owner_id?: number;
    permissions?: number;
    overwrites?: {
      type: 'Role' | 'Member';
      allow: number;
      id: number;
      deny: number;
    }[];
  };
} | {
  path: `/channels/join/${string}/${string}`;
  parts: 4;
  method: 'POST';
  response: undefined;
} | {
  path: `/channels/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    topic?: string;
    name?: string;
    parent_id?: number;
    id: number;
    recipients?: number[];
    type: 'Direct' | 'Group' | 'Text' | 'Voice' | 'Category' | 'Unknown';
    server_id?: number;
    owner_id?: number;
    permissions?: number;
    overwrites?: {
      type: 'Role' | 'Member';
      allow: number;
      id: number;
      deny: number;
    }[];
  };
} | {
  path: `/channels/${string}`;
  parts: 2;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/invites`;
  parts: 1;
  method: 'POST';
  response: {
    channel_id: number;
    server_id?: number;
    id: number;
    code: string;
    inviter_id: number;
    uses: number;
  };
} | {
  path: `/invites/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    channel_id: number;
    server_id?: number;
    id: number;
    code: string;
    inviter_id: number;
    uses: number;
  };
} | {
  path: `/invites/${string}`;
  parts: 2;
  method: 'POST';
  response: undefined;
} | {
  path: `/messages`;
  parts: 1;
  method: 'POST';
  response: {
    id: number;
    content?: string;
    author_id: number;
    edited_at?: number;
    channel_id: number;
  };
} | {
  path: `/messages/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    id: number;
    content?: string;
    author_id: number;
    edited_at?: number;
    channel_id: number;
  };
} | {
  path: `/messages/${string}`;
  parts: 2;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/messages/${string}`;
  parts: 2;
  method: 'PATCH';
  response: {
    id: number;
    content?: string;
    author_id: number;
    edited_at?: number;
    channel_id: number;
  };
} | {
  path: `/servers`;
  parts: 1;
  method: 'POST';
  response: {
    id: number;
    description?: string;
    name: string;
    icon?: string;
    banner?: string;
    permissions: number;
    owner_id: number;
  };
} | {
  path: `/servers/`;
  parts: 2;
  method: 'GET';
  response: {
    id: number;
    description?: string;
    name: string;
    icon?: string;
    banner?: string;
    permissions: number;
    owner_id: number;
  }[];
} | {
  path: `/servers/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    id: number;
    description?: string;
    name: string;
    icon?: string;
    banner?: string;
    permissions: number;
    owner_id: number;
  }[];
} | {
  path: `/servers/${string}`;
  parts: 2;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/servers/${string}/channels`;
  parts: 3;
  method: 'POST';
  response: {
    topic?: string;
    name?: string;
    parent_id?: number;
    id: number;
    recipients?: number[];
    type: 'Direct' | 'Group' | 'Text' | 'Voice' | 'Category' | 'Unknown';
    server_id?: number;
    owner_id?: number;
    permissions?: number;
    overwrites?: {
      type: 'Role' | 'Member';
      allow: number;
      id: number;
      deny: number;
    }[];
  };
} | {
  path: `/servers/${string}/channels/${string}`;
  parts: 4;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/servers/${string}/channels/${string}`;
  parts: 4;
  method: 'PATCH';
  response: {
    topic?: string;
    name?: string;
    parent_id?: number;
    id: number;
    recipients?: number[];
    type: 'Direct' | 'Group' | 'Text' | 'Voice' | 'Category' | 'Unknown';
    server_id?: number;
    owner_id?: number;
    permissions?: number;
    overwrites?: {
      type: 'Role' | 'Member';
      allow: number;
      id: number;
      deny: number;
    }[];
  };
} | {
  path: `/servers/${string}/invites`;
  parts: 3;
  method: 'GET';
  response: {
    channel_id: number;
    server_id?: number;
    id: number;
    code: string;
    inviter_id: number;
    uses: number;
  }[];
} | {
  path: `/servers/${string}/invites`;
  parts: 3;
  method: 'POST';
  response: {
    channel_id: number;
    server_id?: number;
    id: number;
    code: string;
    inviter_id: number;
    uses: number;
  };
} | {
  path: `/servers/${string}/invites/${string}`;
  parts: 4;
  method: 'GET';
  response: {
    channel_id: number;
    server_id?: number;
    id: number;
    code: string;
    inviter_id: number;
    uses: number;
  };
} | {
  path: `/servers/${string}/invites/${string}`;
  parts: 4;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/servers/${string}/members`;
  parts: 3;
  method: 'GET';
  response: {
    id: number;
    roles: number[];
    nickname?: string;
    joined_at: number;
    server_id: number;
  }[];
} | {
  path: `/servers/${string}/members/${string}`;
  parts: 4;
  method: 'GET';
  response: {
    id: number;
    roles: number[];
    nickname?: string;
    joined_at: number;
    server_id: number;
  };
} | {
  path: `/servers/${string}/members/${string}`;
  parts: 4;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/servers/${string}/members/${string}`;
  parts: 4;
  method: 'PATCH';
  response: {
    id: number;
    roles: number[];
    nickname?: string;
    joined_at: number;
    server_id: number;
  };
} | {
  path: `/servers/${string}/roles`;
  parts: 3;
  method: 'GET';
  response: {
    name: string;
    hoist: boolean;
    id: number;
    color: number;
    permissions: number;
    server_id: number;
  }[];
} | {
  path: `/servers/${string}/roles`;
  parts: 3;
  method: 'POST';
  response: {
    name: string;
    hoist: boolean;
    id: number;
    color: number;
    permissions: number;
    server_id: number;
  }[];
} | {
  path: `/servers/${string}/roles/${string}`;
  parts: 4;
  method: 'GET';
  response: {
    name: string;
    hoist: boolean;
    id: number;
    color: number;
    permissions: number;
    server_id: number;
  };
} | {
  path: `/servers/${string}/roles/${string}`;
  parts: 4;
  method: 'DELETE';
  response: undefined;
} | {
  path: `/servers/${string}/roles/${string}`;
  parts: 4;
  method: 'PATCH';
  response: {
    name: string;
    hoist: boolean;
    id: number;
    color: number;
    permissions: number;
    server_id: number;
  }[];
} | {
  path: `/users/@me`;
  parts: 2;
  method: 'GET';
  response: {
    username: string;
    badges: number;
    password: string;
    email: string;
    verified: boolean;
    id: number;
    avatar?: string;
  };
} | {
  path: `/users/${string}`;
  parts: 2;
  method: 'GET';
  response: {
    username: string;
    badges: number;
    password: string;
    email: string;
    verified: boolean;
    id: number;
    avatar?: string;
  };
};
export type GetRoutes = Extract<Routes, { method: 'GET' }>;
export type DeleteRoutes = Extract<Routes, { method: 'DELETE' }>;
export type PostRoutes = Extract<Routes, { method: 'POST' }>;
export type PatchRoutes = Extract<Routes, { method: 'PATCH' }>;
export type PutRoutes = Extract<Routes, { method: 'PUT' }>;
