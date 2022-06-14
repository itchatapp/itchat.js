import { BaseManager } from './BaseManager.ts'
import { Server, Role } from '../structures/mod.ts'
import { APIRole } from '../../deps.ts'

export class ServerRoleManager extends BaseManager<Role, APIRole> {
    holds = Role
    constructor(public readonly server: Server) {
        super(server.client)
    }
}