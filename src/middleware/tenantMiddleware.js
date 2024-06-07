import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { prismaClient } from "../../app.js";
import { UnauthorizedException } from "../exception/unauthorized.js";
import { ErrorCodes } from "../exception/root.js";

export const tenantMiddleware = async (req, res, next) => {
  const user = req.user;

  if (user.user == "Tenant" || user.user == "tenant") {
    next();
  } else {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
  //   const property = prismaClient.property.update({
  //     where: { : user },
  //   });
};
