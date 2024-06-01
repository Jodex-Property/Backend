import { NextFunction, Request, Response } from "express";
import { BadRequests } from "../exceptions/badRequest";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../app";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(
      new UnauthorizedException(
        "You are not allowed to do this",
        ErrorCodes.UNAUTHORIZED
      )
    );
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      next(
        new UnauthorizedException(
          "You are not allowed to do this",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      new UnauthorizedException(
        "You are not allowed to do this",
        ErrorCodes.UNAUTHORIZED
      )
    );
  }
};

export default authMiddleware;
