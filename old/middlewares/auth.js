// import { NextFunction, Request, Response } from "express";
// import { BadRequests } from "../exceptions/badRequest";
// import { UnauthorizedException } from "../exceptions/unauthorized";
// import { ErrorCodes } from "../exceptions/root";
// import * as jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../secrets";
// import { prisma } from "../app";
// import { User } from "@prisma/client";
// const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("x-auth-token")?.split(" ")[1];
//   if (!token) {
//     next(
//       new UnauthorizedException(
//         "You are not allowed to do this",
//         ErrorCodes.UNAUTHORIZED
//       )
//     );
//   }
//   try {
//     const decoded = jwt.verify(token as string, JWT_SECRET);
//     //   const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
//     // if (!user) {
//     //   next(
//     //     new UnauthorizedException(
//     //       "You are not allowed to do this",
//     //       ErrorCodes.UNAUTHORIZED
//     //     )
//     //   );
//     // }
//     req.user = decoded;
//     next();
//   } catch (error) {
//     next(
//       new UnauthorizedException(
//         "You are not allowed to do this",
//         ErrorCodes.UNAUTHORIZED
//       )
//     );
//   }
// };

// export default authMiddleware;
