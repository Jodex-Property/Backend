import { StatusCodes } from "http-status-codes";
import { Base } from "./Base";

export class Forbidden extends Base {
  constructor(message = "Forbidden Error") {
    super(message, StatusCodes.FORBIDDEN);
  }
}
