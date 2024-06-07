import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import {
  createProperty,
  getProperties,
} from "../controllers/property.Controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

const propertyRoute = Router();

propertyRoute.post(
  "/",
  [authMiddleware, landlordMiddleware],
  errorHandler(createProperty)
);

propertyRoute.get(
  "/getProperties",
  [authMiddleware, tenantMiddleware],
  errorHandler(getProperties)
);

export default propertyRoute;
