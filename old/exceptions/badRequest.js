import { ErrorCodes, HttpException } from "./root";

export class BadRequests extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 400, null);
  }
}
