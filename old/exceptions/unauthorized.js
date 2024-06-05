import { HttpException } from "./root";

export class UnauthorizedException extends HttpException {
  constructor(message, errorCode, error) {
    super(message, errorCode, 401, error);
  }
}
