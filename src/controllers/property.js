//import { property } from "lodash";
import { prismaClient } from "../../app.js";

export const newProperty = async (req, res, next) => {
  try {
    const newProperty = await prismaClient.property.create({
      data: {
        ...req.body,
        landlordId: req.user.id,
      },
    });
    res.status(401).json(newProperty);
  } catch (err) {
    next(err);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const properties = await prismaClient.property.findMany({
      include: {
        landlord: true,
        rentals: {
          include: {
            tenant: true,
          },
        },
      },
    });
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};

export const getPropertyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findProperty = await prismaClient.property.findFirst({
      where: { id },
      include: {
        landlord: true,
        rentals: {
          include: {
            tenant: true,
          },
        },
      },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(findProperty);
  } catch (err) {
    next(err);
  }
};
