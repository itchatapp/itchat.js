import { Base } from './Base.ts'


export class Server extends Base {
    constructor(data: unknown) {
        super(data)
        this._patch(data)
    }

    protected _patch(_data: unknown): this {
        return this
    }
}