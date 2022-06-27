import { BaseManager } from './BaseManager.ts';
import { Role, Server } from '../structures/mod.ts';
import { APIRole, Collection } from '../deps.ts';
import { TypeError } from '../errors/mod.ts';

export type RoleResolvable = Role | APIRole | string;

export interface CreateServerRoleOptions {
  name: string;
}

export interface EditServerRoleOptions {
  name: string;
}

export class ServerRoleManager extends BaseManager<Role, APIRole> {
  holds = Role;

  constructor(public readonly server: Server) {
    super(server.client);
  }

  get everyone(): Role {
    return this.cache.get(this.server.id)!;
  }

  fetch(): Promise<Collection<string, Role>>;
  fetch(role: RoleResolvable): Promise<Role>;
  async fetch(role?: RoleResolvable): Promise<Role | Collection<string, Role>> {
    if (typeof role !== 'undefined') {
      const id = this.resolveId(role);

      if (!id) throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');

      const data = await this.client.api.get(
        `/servers/${this.server.id}/roles/${id}`,
      );

      return this.add(data);
    }

    const data = await this.client.api.get(`/servers/${this.server.id}/roles`);

    return data.reduce((cur, prev) => {
      const role = this.add(prev);
      cur.set(role.id, role);
      return cur;
    }, new Collection<string, Role>());
  }

  async delete(role: RoleResolvable): Promise<void> {
    const id = this.resolveId(role);
    if (!id) throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');
    await this.client.api.delete(`/servers/${this.server.id}/roles/${id}`);
  }

  async create(options: CreateServerRoleOptions): Promise<Role> {
    const data = await this.client.api.post(
      `/servers/${this.server.id}/roles`,
      { body: options },
    );
    return this.add(data);
  }

  async edit(
    role: RoleResolvable,
    options: EditServerRoleOptions,
  ): Promise<Role> {
    const id = this.resolveId(role);
    if (!id) throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');
    const data = await this.client.api.patch(
      `/servers/${this.server.id}/roles/${id}`,
      { body: options },
    );
    return this.add(data);
  }
}
