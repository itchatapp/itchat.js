import type { APIRequest } from '../REST.ts';

export class HTTPError extends Error {
  method: string;
  status: number;
  body: APIRequest['body'];
  constructor(response: Response, request: APIRequest) {
    super();
    this.method = request.method;
    this.status = response.status;
    this.body = request.body;
  }
}
