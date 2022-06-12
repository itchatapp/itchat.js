

export abstract class Base {
    id!: string

    constructor(data: unknown) {
        this._patch(data)
    }

    protected _patch(data: unknown): this {
        this.id = (data as { id: string }).id
        return this
    }

    // TODO:
    _update(): this {
        return this
    }
}