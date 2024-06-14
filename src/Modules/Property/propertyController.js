import * as propertyService from "./propertyServices.js";

export const newProperty = async (req, res) => {
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const property = await propertyService.createProperty(
      ...req.body,
      //   req.file,
      userId
    );
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
};
