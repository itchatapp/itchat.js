import { BaseManager } from './BaseManager.ts'
import { Server, Member } from '../structures/mod.ts'
import { APIMember, Collection } from '../deps.ts'

export type ServerMemberResolvable = Member | APIMember | string

export class ServerMemberManager extends BaseManager<Member, APIMember> {
    holds = Member

    constructor(public readonly server: Server) {
        super(server.client)
    }

    async fetch(member?: ServerMemberResolvable) {
        const id = this.resolveId(member!)

        if (id) {
            const data = await this.client.api.get(`/servers/${this.server.id}/members/${id}`)
            return this.add(data)
        }

        const data = await this.client.api.get(`/servers/${this.server.id}/members`)

        return data.reduce((cur, prev) => {
            const member = this.add(prev)
            cur.set(member.id, member)
            return cur
        }, new Collection<string, Member>())
    }
}