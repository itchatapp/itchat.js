import { Client } from '../Client.ts'
import { Snowflake } from '../deps.ts'

export abstract class Base {
  id!: string;

  constructor(public readonly client: Client, data: unknown) {
    this._patch(data);
  }

  protected _patch(data: unknown): this {
    this.id = (data as { id: string }).id;
    return this;
  }

  // TODO:
  _update(): this {
    return this;
  }

  get createdTimestamp(): number {
    return Snowflake.timestampOf(this.id)
  }

  get createdAt(): Date {
    return new Date(this.createdTimestamp)
  }
}

export { Client }