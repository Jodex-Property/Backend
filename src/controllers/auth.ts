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

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
    const { email, password, passwordConfirm, userName } = req.body;
    if (password !== passwordConfirm) {
      res.status(400).send("Make sure the passwords are the same");
    }

    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      next(
        new BadRequests(
          "Landlord already exists",
          ErrorCodes.USER_ALREADY_EXISTS
        )
      );
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
  } catch (err: any) {
    next(
      new UnprocessableEntity(
        err?.issues,
        "Unprocessable error",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let landlord = await prisma.landlord.findFirst({ where: { email } });
  if (!landlord) {
    throw Error("Landlord does not exist");
  }
  if (!compareSync(password, landlord.password)) {
    throw Error("incorrect password");
  }
  const token = jwt.sign({ userId: landlord.id }, JWT_SECRET);
  res.status(201).json({ landlord, token });
};
