import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../old/secrets.js";
import { prismaClient } from "../../app.js";
import { UnauthorizedException } from "../exception/unauthorized.js";
import { ErrorCodes } from "../exception/root.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      next(
        new UnauthorizedException(
          "no user with this authorization",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }
    req.user = user;

    next();
  } catch (err) {
    err;
  }
};
