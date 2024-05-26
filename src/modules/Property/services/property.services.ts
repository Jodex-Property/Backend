import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../../database/db";
import { User } from "../../../users/user/user";
import { BadRequest } from "../../../errors";

export class PropertyServices {
  private userRepository = new User();
  public addProperty: RequestHandler = async (req, res, next) => {
    try {
      const landlord = await this.userRepository.findLandlordByUserId(
        req.params.landlordId
      );
      const findIfExists = await prisma.property.findFirst({
        where: {
          landlordId: landlord.id,
        },
      });
      if (findIfExists) {
        throw new BadRequest("Already exist");
      }
      await prisma.property.create({
        data: {
          landlordId: landlord.id,
          flat: req.body.flat,
          unit: req.body.unit,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          description: req.body.description,
          rooms: req.body.rooms,
          bath: req.body.bath,
          kitchen: req.body.kitchen,
          diningRoom: req.body.diningRoom,
          pictures: req.body.pictures,
          garage: req.body.garage,
          wifi: req.body.wifi,
          houseType: req.body.houseType,
          address: req.body.address,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
