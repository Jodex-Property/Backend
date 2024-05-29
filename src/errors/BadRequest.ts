import { StatusCodes } from "http-status-codes";
import { Base } from "./Base";

export class BadRequest extends Base {
  constructor(message: string = "Bad Request Error") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
