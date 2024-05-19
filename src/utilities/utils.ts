import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import cache from "memory-cache";
import otpGenerator from "otp-generator";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors";
import { config } from "../configurations/config";

interface removeItemType {
  item: string;
}

export class ServerUtils {
  public salt = async () => await bcrypt.genSalt(10);
  public hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, await this.salt());
    return hashedPassword;
  };
  public async validatePassword(
    password: string,
    comparePassword: string
  ): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, comparePassword);
    if (!isPasswordValid) {
      throw new BadRequest("Invalid password");
    }
    return isPasswordValid;
  }
  public createToken(authId: string): string {
    const token = jwt.sign({ authId }, config.jwt.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  }
}
