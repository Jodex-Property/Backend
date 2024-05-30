import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../app";
import { hashSync } from "bcrypt";

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
