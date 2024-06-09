import { prismaClient } from "../../app.js";

export const createProperty = async (req, res, next) => {
  const landlordId = req.user.id;
  const newProperty = await prismaClient.property.create({
    data: {
      ...req.body,
      landlordId,
    },
  });
  res.json(newProperty);
};

export const getProperties = async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        landlord: true,
        tenants: true,
      },
    });
    res.status(200).json({ properties });
  } catch (error) {
    next(error);
  }
};
