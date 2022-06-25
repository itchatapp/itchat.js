import { Base, Client } from './Base.ts';
import { APIRole, Permissions } from '../deps.ts';
import { Server } from './mod.ts';

export class Role extends Base {
  name!: string;
  color: number | null = null;
  hoist = false;
  serverId!: string;
  permissions = new Permissions();

  constructor(client: Client, data: APIRole) {
    super(client);
    this._patch(data);
  }

  protected _patch(data: APIRole): this {
    super._patch(data);
    if (data.name) this.name = data.name;
    if ('hoist' in data) this.hoist = data.hoist;
    if (data.server_id) this.serverId = data.server_id + '';
    if ('color' in data) this.color = data.color ?? null;
    if ('permissions' in data) this.permissions.set(BigInt(data.permissions));
    return this;
  }

  get server(): Server {
    return this.client.servers.cache.get(this.serverId)!;
  }

  toString(): string {
    return this.name;
  }
}
