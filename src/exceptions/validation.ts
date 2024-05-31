import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  constructor(errorCode: number, message: string, error: any) {
    super(message, errorCode, 422, null);
  }
}
