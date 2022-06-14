import { BaseManager } from './BaseManager.ts'
import { Server, Member } from '../structures/mod.ts'
import { APIMember } from '../../deps.ts'


export class ServerMemberManager extends BaseManager<Member, APIMember> {
    holds = Member
    constructor(public readonly server: Server) {
        super(server.client)
    }
}