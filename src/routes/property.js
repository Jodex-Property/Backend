import { Router } from "express";
import {
  getProperties,
  getPropertyById,
  newProperty,
} from "../controllers/property.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";

const propertyRouter = Router();

propertyRouter.post("/", [authMiddleware], [landlordMiddleware], newProperty);
propertyRouter.get("/getProperties", authMiddleware, getProperties);
propertyRouter.get("/:id", authMiddleware, getPropertyById);

export default propertyRouter;
