import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../app";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../secrets";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let tenant = await prisma.tenant.findFirst({ where: { email } });
  if (!tenant) {
    throw Error("tenant does not exist");
  }
  if (!compareSync(password, tenant.password)) {
    throw Error("incorrect password");
  }
  const token = jwt.sign({ userId: tenant.id }, JWT_SECRET);
  res.status(201).json({ tenant, token });
};
