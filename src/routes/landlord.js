import { Router } from "express";
import * as landlordController from "../Modules/Landlord/landlordServices.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import authRoutes from "./auth.js";

const landlordRoute = Router();
landlordRoute.get("/landlords", landlordController.getAllLandlords);
landlordRoute.get(
  "/properties",
  [authMiddleware],
  authorize("ADMIN", "TENANT", "LANDLORD"),
  landlordController.getLandlordProperties
);

landlordRoute.get(
  "/properties/:propertyId",
  [authMiddleware],
  authorize("ADMIN", "TENANT", "LANDLORD"),
  landlordController.getLandlordProperty
);
export default landlordRoute;
