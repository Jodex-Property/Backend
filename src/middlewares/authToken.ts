import { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import { AuthRequest } from "../interface/types";
import { BadRequest, Unauthorized } from "../errors";
import { config } from "../configurations/config";
import { User } from "../users/user/user";

export class AuthMiddleware {
  private userRepository = new User();

  /**
   * This middleware will set and verify the user making request to the server resources
   * @param AuthRequest
   * @param res
   * @param next
   */

  public Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.get("Authorization");
      if (!authHeader) {
        throw new BadRequest("Authorization token is required");
      }
      let decode: any;
      const token = authHeader?.split(" ")[1];
      decode = Jwt.verify(token as string, `${config.jwt.JWT_SECRET}`);
      if (!token || !decode) {
        throw new BadRequest("Invalid token");
      }
      req.authId = decode.authId;
      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * This middleware will set and verify the user making request to the server resources
   * @param AuthRequest
   * @param res
   * @param next
   */
  //   public agent Auth = async (
  //     req: AuthRequest,
  //     res: Response,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const { agentId } = req.params;
  //       const agent = await this.userRepository.findUserById(agentId);
  //       if (agent.id !== req.authId) {
  //         throw new UnauthorizedError("You are not authorized");
  //       }
  //       if (!teacher.profileCompleted) {
  //         throw new UnauthorizedError("Please complete profile registration");
  //       }
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  /**
   * This middleware will set and verify the user making request to the server resources
   * @param AuthRequest
   * @param res
   * @param next
   */
  public landlordAuth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req?.authId) {
        throw new BadRequest("authId not set");
      }
      const { landlordId } = req.params;
      const landlord = await this.userRepository.findUserById(landlordId);
      if (landlord.id !== req.authId) {
        throw new Unauthorized("You are not authorized");
      }
    } catch (error) {
      next(error);
    }
  };
  //   public parentAuth = async (
  //     req: AuthRequest,
  //     res: Response,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       if (!req?.authId) {
  //         throw new BadRequestError("authId not set");
  //       }
  //       const { parentId } = req.params;
  //       const parent = await this.userRepository.findUserById(parentId);
  //       if (parent.id !== req.authId) {
  //         throw new UnauthorizedError("You are not authorized");
  //       }
  //       if (!parent.profileCompleted) {
  //         throw new UnauthorizedError("Please complete profile registration");
  //       }
  //       if (parent.status === "BLOCKED") {
  //         throw new UnauthorizedError("Your account is blocked or deactivated");
  //       }
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}
