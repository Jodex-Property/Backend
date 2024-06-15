import { prisma } from "../../../app.js";

export const getPropertiesByAgent = async (agentId) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        userId: agentId,
        user: {
          userType: "AGENT",
        },
      },
      include: {
        user: true,
      },
    });
    return properties;
  } catch (error) {
    throw new Error("Error fetching properties by agent");
  }
};
