import { prisma } from "../../../app.js";

export const getAllLandlords = async (req, res, next) => {
  try {
    const landlords = await prisma.user.findMany({
      where: {
        userType: "LANDLORD",
      },
    });
    landlords.password = undefined;
    landlords.passwordConfirm = undefined;
    res.status(200).json({ message: "success", tenants });
  } catch (error) {
    next(error);
  }
};

export const getLandLandlordById = async (req, res, next) => {
  try {
    const { id: landlordId } = req.body;
    const landlord = await prisma.user.findFirst({
      where: { userType: "LANDLORD" },
    });
    landlord.password = undefined;
    landlord.passwordConfirm = undefined;
    res.status(200).json({ message: "success", tenants });
  } catch (err) {
    next(err);
  }
};

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
    const property = await prisma.property.findFirst({
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
