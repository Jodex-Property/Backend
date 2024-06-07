import { prismaClient } from "../../app.js";

export const getAllLandlords = async (req, res, next) => {
  try {
    const landlords = await prismaClient.landlord.findMany();
    res.status(200).json({ landlords });
  } catch (error) {
    next(error);
  }
};

export const getLandlordById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const landlord = await prismaClient.landlord.findUnique({
      where: { id },
      include: {
        properties: true,
      },
    });

    if (!landlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }

    res.status(200).json({ landlord });
  } catch (error) {
    next(error);
  }
};
