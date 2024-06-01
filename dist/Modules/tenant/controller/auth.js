"use strict";
// import { PrismaClient } from "@prisma/client";
// import { NextFunction, Request, Response } from "express";
// import { prisma } from "../../../app";
// import { hashSync, compareSync } from "bcrypt";
// import * as jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../../../secrets";
// import { BadRequests } from "../../../exceptions/badReuest";
// import { ErrorCodes } from "../../../exceptions/root";
// import { UnprocessableEntity } from "../../../exceptions/validation";
// import { LandlordSignUpSchema } from "../../../Schema/landlordSchema/user";
// import { TenantSignUpSchema } from "../../../Schema/tenantSchema/users";
// export const signup = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     TenantSignUpSchema.parse(req.body);
//     const { email, password, userName } = req.body;
//     let tenant = await prisma.tenant.findFirst({ where: { email } });
//     if (tenant) {
//       next(
//         new BadRequests("Tenant already exists", ErrorCodes.USER_ALREADY_EXISTS)
//       );
//     }
//     tenant = await prisma.tenant.create({
//       data: {
//         email,
//         password: hashSync(password, 10),
//         userName,
//       },
//     });
//     res.status(201).json({ tenant });
//   } catch (err: any) {
//     next(
//       new UnprocessableEntity(
//         err?.cause?.issues,
//         "Unprocessable error",
//         ErrorCodes.UNPROCESSABLE_ENTITY
//       )
//     );
//   }
// };
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   let tenant = await prisma.tenant.findFirst({ where: { email } });
//   if (!tenant) {
//     throw Error("This tenant does not exist");
//   }
//   if (!compareSync(password, tenant.password)) {
//     throw Error("incorrect password");
//   }
//   const token = jwt.sign({ userId: tenant.id }, JWT_SECRET);
//   res.status(201).json({ tenant, token });
// };
