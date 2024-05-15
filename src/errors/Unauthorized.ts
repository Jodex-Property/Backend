import { StatusCodes } from "http-status-codes";
import { Base } from "./Base";

export class UnauthorizedError extends Base {
  constructor(message = "Authorization Failure") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
