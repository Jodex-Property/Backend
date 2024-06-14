import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { prisma } from "../../app.js";
import { UnauthorizedException } from "../exception/unauthorized.js";
import { ErrorCodes } from "../exception/root.js";

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
