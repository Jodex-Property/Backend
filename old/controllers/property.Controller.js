import { prismaClient } from "../../app.js";

export const createProperty = async (req, res, next) => {
  //   const landlord = await prismaClient.landlord.findFirst({
  //     where: { email },
  //   });
  //   const doesPropertyExist = await prismaClient.property.findFirst({
  //     where: { address },
  //   });
  //   if (doesPropertyExist) {
  //     res.send("This property already exists");
  //   }

  const landlordId = req.user.id;
  const property = await prismaClient.property.create({
    data: {
      ...req.body,
      landlordId,
    },
  });
  res.json(property);
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
