import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../app";
import { hashSync } from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  let tenant = await prisma.tenant.findFirst({ where: { email } });
  if (tenant) {
    throw Error("Landlord already exists");
  }
  tenant = await prisma.tenant.create({
    data: {
      email,
      password: hashSync(password, 10),
      userName,
    },
  });
  res.status(201).json({ tenant });
};
