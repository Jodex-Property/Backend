import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../secrets";

export const signup = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  let landlord = await prisma.landlord.findFirst({ where: { email } });
  if (landlord) {
    throw Error("Landlord already exists");
  }
  landlord = await prisma.landlord.create({
    data: {
      email,
      password: hashSync(password, 10),
      userName,
    },
  });
  res.status(201).json({ landlord });
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
