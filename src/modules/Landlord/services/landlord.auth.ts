import { RequestHandler } from "express";
import { ServerUtils } from "../../../utilities/utils";
import prisma from "../../../database/db";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "../../../errors";
import { InternalServerError } from "../../../errors/internalServerError";
import { User } from "../../../users/user/user";
import jwt from "jsonwebtoken";
import { config } from "../../../configurations/config";

export class LandlordAuthLogics {
  private user = new User();
  private utils = new ServerUtils();
  public signup: RequestHandler = async (req, res, next) => {
    const { password, email } = req.body;
    try {
      await this.user.doesUserExistByEmail(email);
      const landlord = await prisma.user.create({
        data: {
          email: email,
          password: await this.utils.hashPassword(password),
          userType: "landlord",
        },
      });
      // const token = jwt.sign({ id: landlord.id }, config.jwt.JWT_SECRET, {
      //   expiresIn: "30d",
      // });
      console.log(landlord.id);
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
