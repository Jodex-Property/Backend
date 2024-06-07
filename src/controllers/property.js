//import { property } from "lodash";
import { prismaClient } from "../../app.js";

export const newProperty = async (req, res, next) => {
  try {
    // if (req.user.userType !== "LANDLORD") {
    //   return res
    //     .status(403)
    //     .json({ error: "Only landlords can create properties" });
    // }
    const newProperty = await prismaClient.property.create({
      data: {
        ...req.body,
        landlordId,
      },
    });
  } catch (err) {
    next(err);
  }
  res.json(property);
};
