import {INTERNAL_SERVER_ERROR} from "http-status";

export class InternalError extends Error {
  public status: number;

  constructor(err: any) {
    super(err.message || 'Internal Server Error');
    this.name = 'InternalError';
    this.status = err.status || INTERNAL_SERVER_ERROR;
  }
}