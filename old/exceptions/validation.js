import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  constructor(errorCode, message, error) {
    super(message, errorCode, 422, null);
  }
}
