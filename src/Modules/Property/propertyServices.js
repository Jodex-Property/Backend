//import { property } from "lodash";
import { prisma } from "../../../app.js";

// export const createProperty = async (propertyData, userId) => {
//   //   let imageUrl = null;

//   //   if (file) {
//   //     imageUrl = await uploadToS3(file);
//   //   }

//   const property = await prisma.property.create({
//     data: {
//       ...propertyData,
//       //   imageUrl,
//       userId, // Include the user ID here
//     },
//   });

//   return property;
// };

export const newProperty = async (req, res, next) => {
  try {
    const newProperty = await prisma.property.create({
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
    const properties = await prisma.property.findMany({
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
    const findProperty = await prisma.property.findFirst({
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
