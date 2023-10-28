import { HTTP_STATUS_CODES } from "..";
import { AbstractError } from "./abstract-error";

export class ApiError extends AbstractError {
  statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

  constructor(public error: Error) {
    super("internal server error");

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: (this.error as Error).message,
      },
    ];
  }
}
