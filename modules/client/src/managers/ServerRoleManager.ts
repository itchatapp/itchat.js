import { BaseManager } from './BaseManager.ts'
import { Server, Role } from '../structures/mod.ts'
import { APIRole, Collection } from '../deps.ts'

export type RoleResolvable = Role | APIRole | string

export class ServerRoleManager extends BaseManager<Role, APIRole> {
    holds = Role

    constructor(public readonly server: Server) {
        super(server.client)
    }

    fetch(): Promise<Collection<string, Role>>
    fetch(role: RoleResolvable): Promise<Role>
    async fetch(role?: RoleResolvable): Promise<Role | Collection<string, Role>> {
        const id = this.resolveId(role!)

        if (id) {
            const data = await this.client.api.get(`/servers/${this.server.id}/roles/${id}`)
            return this.add(data)
        }

        const data = await this.client.api.get(`/servers/${this.server.id}/roles`)

        return data.reduce((cur, prev) => {
            const role = this.add(prev)
            cur.set(role.id, role)
            return cur
        }, new Collection<string, Role>())
    }
}