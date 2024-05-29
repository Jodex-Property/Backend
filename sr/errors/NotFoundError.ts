import { StatusCodes } from "http-status-codes";
import { Base } from "./Base";

export class NotFoundError extends Base {
  constructor(message = "Resource Not Found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}
