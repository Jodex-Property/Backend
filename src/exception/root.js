//message status code error code error
//import Enum from "enum";

export class HttpException extends Error {
  message;
  errorCode;
  statusCode;
  errors;
  constructor(message, errorCode, statusCode, error) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export const ErrorCodes = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROCESSABLE_ENTITY: 2001,
  INTERNAL_EXCEPTION: 3001,
  UNAUTHORIZED: 40001,
};
