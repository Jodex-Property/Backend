import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequests } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../Schema/Schema/user";
import { NotFound } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { email, password, passwordConfirm, userName } = req.body;
  if (password !== passwordConfirm) {
    throw new BadRequests(
      "Passwords do no match",
      ErrorCodes.INCORRECT_PASSWORD
    );
  }

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    new BadRequests("User already exists", ErrorCodes.USER_ALREADY_EXISTS);
  }
  user = await prisma.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      userName,
      passwordConfirm: hashSync(passwordConfirm, 10),
      //  user: landlord,
    },
  });
  res.status(201).json({ user });
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFound("User does not exist", ErrorCodes.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequests("incorrect password", ErrorCodes.INCORRECT_PASSWORD);
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.status(201).json({ user, token });
};
