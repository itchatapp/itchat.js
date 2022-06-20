import { CDN } from './CDN.ts';
import { DEFAULT_REST_OPTIONS, Queue, stringifyQuery } from './util/mod.ts';
import { HTTPError } from './errors/mod.ts';
import { deepmerge as merge } from 'https://deno.land/x/deepmergets@v4.0.3/dist/deno/index.ts';
import type {
  DeleteRoutes,
  GetRoutes,
  PatchRoutes,
  PostRoutes,
  PutRoutes,
} from 'https://deno.land/x/itchatjs_types@v1.2.3/mod.ts';

export interface RESTOptions {
  app: string;
  api: string;
  cdn: string;
  timeout: number;
  retries: number;
}

export interface APIRequest {
  path: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: unknown;
  query?: Record<string, unknown>;
  retries: number;
}

type Count<
  Str extends string,
  SubStr extends string,
  Matches extends null[] = [],
> = Str extends `${infer _}${SubStr}${infer After}`
  ? Count<After, SubStr, [...Matches, null]>
  : Matches['length'];

// deno-lint-ignore ban-types
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
}
  : T;

export class REST {
  readonly cdn: CDN;
  protected readonly options: RESTOptions;
  #token: string | null = null;
  #queue = new Queue();

  debug(_msg: string) {}

  constructor(options: DeepPartial<RESTOptions> = {}) {
    this.options = merge(DEFAULT_REST_OPTIONS, options) as RESTOptions;
    this.cdn = new CDN(this.options);
  }

  private get headers() {
    if (!this.#token) {
      throw new Error(
        'Expected token to be set for this request, but none was present',
      );
    }

    return {
      Authorization: this.#token,
    };
  }

  setToken(token: string | null): this {
    this.#token = token;
    return this;
  }

  // deno-lint-ignore no-explicit-any
  private async request(request: APIRequest): Promise<any> {
    await this.#queue.wait();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        this.options.timeout,
      );
      const res = await fetch(request.path, {
        method: request.method,
        headers: this.headers,
        body: request.body ? JSON.stringify(request.body) : void 0,
        signal: controller.signal,
      }).finally(() => clearTimeout(timeout));

      if (res.ok) {
        if (res.headers.get('Content-Type')?.startsWith('application/json')) {
          return res.json();
        }
        return res.arrayBuffer();
      }

      // TODO: Handle Rate limits
      if (res.status === 429) {
        this.debug(`Hit a 429 while executing a request.
          Method: ${request.method}
          Path: ${request.path}
          Limit: ${this.options.retries}
          Timeout: ${this.options.timeout}ms`);
      }

      if (res.status >= 500 && res.status < 600) {
        if (request.retries === this.options.retries) throw res;

        request.retries++;

        return this.request(request);
      }

      throw res;
    } catch (err) {
      if (request.retries === this.options.retries) {
        if (err instanceof Response) throw new HTTPError(err, request);
        throw err;
      }

      request.retries++;

      return this.request(request);
    } finally {
      this.#queue.next();
    }
  }

  private generateRequest(
    path: string,
    opts: Partial<APIRequest> = {},
  ): APIRequest {
    const query = opts.query ? `?${stringifyQuery(opts.query)}` : '';
    const options: APIRequest = {
      path: this.options.api + path + query,
      method: opts.method ?? 'GET',
      retries: 0,
      body: opts.body,
      query: opts.query,
    };

    this.debug(
      `Generating request options for route: ${path} method: ${options.method}`,
    );

    return options;
  }

  get<
    Path extends GetRoutes['path'],
    Route extends Extract<
      GetRoutes,
      { path: Path; parts: Count<Path, '/'>; method: 'GET' }
    >,
  >(path: Path, options: Partial<APIRequest> = {}): Promise<Route['response']> {
    return this.request(
      this.generateRequest(path, { ...options, method: 'GET' }),
    );
  }

  post<
    Path extends PostRoutes['path'],
    Route extends Extract<
      PostRoutes,
      { path: Path; parts: Count<Path, '/'>; method: 'POST' }
    >,
  >(path: Path, options: Partial<APIRequest> = {}): Promise<Route['response']> {
    return this.request(
      this.generateRequest(path, { ...options, method: 'POST' }),
    );
  }

  delete<
    Path extends DeleteRoutes['path'],
    Route extends Extract<
      DeleteRoutes,
      { path: Path; parts: Count<Path, '/'>; method: 'DELETE' }
    >,
  >(path: Path, options: Partial<APIRequest> = {}): Promise<Route['response']> {
    return this.request(
      this.generateRequest(path, { ...options, method: 'DELETE' }),
    );
  }

  put<
    Path extends PutRoutes['path'],
    Route extends Extract<
      PutRoutes,
      { path: Path; parts: Count<Path, '/'>; method: 'PUT' }
    >,
  >(path: Path, options: Partial<APIRequest> = {}): Promise<Route['response']> {
    return this.request(
      this.generateRequest(path, { ...options, method: 'PUT' }),
    );
  }

  patch<
    Path extends PatchRoutes['path'],
    Route extends Extract<
      PatchRoutes,
      { path: Path; parts: Count<Path, '/'>; method: 'PATCH' }
    >,
  >(path: Path, options: Partial<APIRequest> = {}): Promise<Route['response']> {
    return this.request(
      this.generateRequest(path, { ...options, method: 'PATCH' }),
    );
  }
}
