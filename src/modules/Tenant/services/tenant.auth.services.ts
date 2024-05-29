import { RequestHandler } from "express";
//import { generateUsername } from "unique-username-generator";
import prisma from "../../../database/db";
import { StatusCodes } from "http-status-codes";
import { ServerUtils } from "../../../utilities/utils";
import { InternalServerError } from "../../../errors/internalServerError";
//import { ParentEmails } from "../emails/emails";
import { BadRequest } from "../../../errors";
import { User } from "../../../users/user/user";

export class TenantAuthServices {
  private utils = new ServerUtils();
  private user = new User();

  public signup: RequestHandler = async (req, res, next) => {
    const { password, email, userName } = req.body;
    try {
      const findTenant = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (findTenant) {
        throw new BadRequest("This is email is taken by another user");
      }
      const tenant = await prisma.user.create({
        data: {
          email: email,
          password: await this.utils.hashPassword(password),
          userType: "tenant",
          isEmailVerified: false,
          profileCompleted: false,
          userName: userName,
        },
      });
      res.status(StatusCodes.OK).json({
        message:
          "Account created successfully, please verify your email address",
          tenant
      });
    } catch (error) {
      next(error);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const findTenant = await this.user.findUserByEmail(email);
      if (findTenant.userType !== "tenant") {
        throw new BadRequest("Permission denied. Use a tenant login details");
      }
      if (!findTenant) {
        throw new BadRequest("Please verify email address");
      }
      await this.utils.validatePassword(
        password,
        findTenant.password as string
      );
      //const token = this.utils.createToken(findTenant?.id as string);
      const parentCredentials = {
        //token,
        parentUserId: findTenant?.id,
        isEmailVerified: true,
        // isProfileCompleted: findTenant?.profileCompleted,
      };
      res
        .status(StatusCodes.OK)
        .json({ message: "Login successfully", parentCredentials });
    } catch (error) {
      next(error);
    }
  };
}
