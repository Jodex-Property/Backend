import { prismaClient } from "../../app.js";

export const getAllTenants = async (req, res, next) => {
  try {
    const tenants = await prismaClient.user.findMany({
      where: {
        userType: "TENANT",
      },
    });
    let password = undefined;
    let passwordConfirm = undefined;
    res.status(200).json({ message: "success", tenants });
  } catch (error) {
    next(error);
  }
};
