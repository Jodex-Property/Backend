import prisma from "../../database/db";
//import { BadRequest, NotFoundError } from "../../errors";
import { BadRequest } from "../../errors/BadRequest";
import { NotFoundError } from "../../errors/NotFoundError";

export class User {
  public findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        landlord: true,
        tenant: true,
      },
    });
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    return user;
  };
  public doesUserExistByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        landlord: true,
        tenant: true,
      },
    });
    if (user) {
      throw new BadRequest("This email is taken by another user");
    }
    return user;
  };
  public doesUserExistById = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        landlord: {
          select: {
            id: true,
          },
        },
      },
    });
    if (user) {
      throw new BadRequest("User already exist");
    }
    return user;
  };
  public findUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        landlord: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    return user;
  };
  public findLandlordByUserId = async (userId: string) => {
    const landlord = await prisma.landlord.findUnique({
      where: { userId: userId },
      include: {
        user: true,
      },
    });
    if (!landlord) {
      throw new NotFoundError("School user not found");
    }
    return landlord;
  };
}
