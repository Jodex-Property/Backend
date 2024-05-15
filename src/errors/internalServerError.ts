import { StatusCodes } from "http-status-codes";
import { Base } from "./Base";

export class InternalServerError extends Base {
  constructor(message = "Forbidden Error") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
