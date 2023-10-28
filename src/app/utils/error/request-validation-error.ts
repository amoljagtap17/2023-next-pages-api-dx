import { ValidationError } from "yup";
import { HTTP_STATUS_CODES } from "..";
import { AbstractError } from "./abstract-error";

export class RequestValidationError extends AbstractError {
  statusCode = HTTP_STATUS_CODES.BAD_REQUEST;

  constructor(public error: ValidationError) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.error.inner.map((error) => ({
      message: error.errors[0],
      field: error.path,
    }));
  }
}
