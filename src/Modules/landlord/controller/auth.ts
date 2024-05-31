import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../secrets";
import { BadRequests } from "../../../exceptions/badReuest";
import { ErrorCodes } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { LandlordSignUpSchema } from "../../../Schema/landlordSchema/landlord";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    LandlordSignUpSchema.parse(req.body);
    const { email, password, userName } = req.body;

    let landlord = await prisma.landlord.findFirst({ where: { email } });
    if (landlord) {
      next(
        new BadRequests(
          "Landlord already exists",
          ErrorCodes.USER_ALREADY_EXISTS
        )
      );
    }
    landlord = await prisma.landlord.create({
      data: {
        email,
        password: hashSync(password, 10),
        userName,
      },
    });
    res.status(201).json({ landlord });
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
