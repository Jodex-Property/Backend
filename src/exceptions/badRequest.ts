import { ErrorCodes, HttpException } from "./root";

export class BadRequests extends HttpException {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 400, null);
  }
}
