import { RequestHandler } from "express";
import { ServerUtils } from "../../../utilities/utils";
import prisma from "../../../database/db";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "../../../errors";
import { InternalServerError } from "../../../errors/internalServerError";
import { User } from "../../../users/user/user";
import jwt from "jsonwebtoken";
//import { LandlordEmails } from "../email/email";
import { config } from "../../../configurations/config";

export class LandlordAuthLogics {
  private user = new User();
  private utils = new ServerUtils();
 // private landlordEmail = new LandlordEmails();
  public signup: RequestHandler = async (req, res, next) => {
    const { password, email, userName } = req.body;
    try {
      await this.user.doesUserExistByEmail(email);
      const landlord = await prisma.user.create({
        data: {
          email: email,
          password: await this.utils.hashPassword(password),
          isEmailVerified: false,
          profileCompleted: false,
          userName: userName,
          userType: "landlord",
        },
      });
      // const token = this.utils.generateOTP();
      // await this.landlordEmail.sendLandlordRegistrationMessage({
      //   email: landlord.email,
      // });
      // const updateOtp = await prisma.userToken.upsert({
      //   where: { userId: landlord?.id },
      //   create: {
      //     token: token,
      //     userId: landlord.id,
      //     tokenGeneratedTime: new Date(),
      //   },
      //   update: {
      //     token: token,
      //     userId: landlord.id,
      //     tokenGeneratedTime: new Date(),
      //   },
      // });
      res.status(StatusCodes.OK).json({
        message: "Account created successfully",
        // token,
        landlord,
      });
    } catch (error) {
      next(error);
    }
  };
  public login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const getLandlordByEmail = await this.user.findUserByEmail(email);
      if (getLandlordByEmail.userType !== "landlord") {
        throw new BadRequest("Permission denied. Use a landlord login details");
      }

      await this.utils.validatePassword(
        password,
        getLandlordByEmail.password as string
      );
      // const token = this.utils.createToken(getLandlordByEmail?.id as string);
      const landlordCredentials = {
        // token,
        landlordUserId: getLandlordByEmail?.id,
      };
      res
        .status(StatusCodes.OK)
        .json({ message: "Login successfully", landlordCredentials });
    } catch (error) {
      next(error);
    }
  };
  
}
