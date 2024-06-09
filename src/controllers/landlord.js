import { prismaClient } from "../../app.js";

export const getLandlordProperties = async (req, res, next) => {
  try {
    // Assuming the landlord's ID is available in req.user.id
    const landlordId = req.user.id;

    const properties = await prisma.property.findMany({
      where: { landlordId },
      include: {
        landlord: {
          select: {
            id: true,
            email: true,
            userType: true,
            // Include other fields you want to expose
          },
        },
        rentals: {
          include: {
            tenant: {
              select: {
                id: true,
                email: true,
                userType: true,
                // Include other fields you want to expose
              },
            },
          },
        },
      },
    });

    if (!properties.length) {
      return res
        .status(404)
        .json({ message: "No properties found for this landlord" });
    }

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};
export const getLandlordProperty = async (req, res, next) => {
  const { id: landlordId } = req.body;
  try {
    const property = await prismaClient.property.findMany({
      where: { landlordId },
      include: {
        landlord: {
          select: {
            id: true,
            email: true,
            userType: true,
            userName: true,
            // Include other fields you want to expose
          },
        },
        rentals: {
          include: {
            tenant: {
              select: {
                id: true,
                email: true,
                userType: true,
                // Include other fields you want to expose
              },
            },
          },
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
