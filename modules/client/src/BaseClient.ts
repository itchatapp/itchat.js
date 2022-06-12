import { REST, RESTOptions, EventEmitter, deepMerge } from '../deps.ts'

export interface ClientOptions {
    rest: RESTOptions
    ws: unknown
}

// deno-lint-ignore ban-types
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

export abstract class BaseClient extends EventEmitter {
    readonly api: REST
    readonly options: ClientOptions
    #token: string | null = null

    constructor(opts: DeepPartial<ClientOptions> = {}) {
        super()
        this.options = deepMerge({}, opts) as ClientOptions;
        this.api = new REST(this.options.rest);
    }

    debug(msg: unknown): void {
        this.emit('debug', `[MAIN]: ${msg}`);
    }

    set token(token: string | null) {
        this.#token = token;
        this.api.setToken(token);
    }

    get token(): string | null {
        return this.#token;
    }
}