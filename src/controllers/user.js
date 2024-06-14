import { PrismaClient } from "@prisma/client";
//import { cloudinary } from "../services/cloudinary-config";
import { prisma } from "../../app.js";

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { userName, phoneNumber, picture } = req.body;
  // const file = req.file;

  try {
    const updateData = { userName, phoneNumber, picture };
    // if (file) {
    //   updateData.profilePictureUrl = file.path;
    // }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
