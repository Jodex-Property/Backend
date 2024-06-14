import { prisma } from "../../app.js";

export const getAllTenants = async (req, res, next) => {
  try {
    const tenants = await prisma.user.findMany({
      where: {
        userType: "TENANT",
      },
    });
    tenants.password = undefined;
    tenants.passwordConfirm = undefined;
    res.status(200).json({ message: "success", tenants });
  } catch (error) {
    next(error);
  }
};
