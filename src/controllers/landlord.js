import { prismaClient } from "../../app.js";

export const getLandlordProperties = async (req, res, next) => {
  try {
    // Assuming the landlord's ID is available in req.user.id
    const landlordId = req.user.id;

    const properties = await prismaClient.property.findMany({
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

    if (properties.length === 0) {
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
  try {
    const { propertyId } = req.params;
    const { id: landlordId } = req.body;
    const property = await prismaClient.property.findFirst({
      where: { id: propertyId, landlordId },
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
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};
