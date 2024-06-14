import { Router } from "express";
import * as propertyController from "../Modules/Property/propertyServices.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";

const propertyRouter = Router();

propertyRouter.post(
  "/",
  [authMiddleware],
  authorize("LANDLORD", "AGENT", "PROPERTY_MANAGER", "ADMIN"),
  propertyController.newProperty
);
propertyRouter.get(
  "/getProperties",
  authMiddleware,
  authorize("AGENT", "TENANT"),
  propertyController.getProperties
);
propertyRouter.get(
  "getProperty/:id",
  [authMiddleware],
  propertyController.getPropertyById
);
propertyRouter.get("/:id", authMiddleware, propertyController.getPropertyById);

export default propertyRouter;
