import { Router } from "express";
import {
  getAllLandlords,
  getLandlordProperties,
  getLandlordProperty,
} from "../controllers/landlord.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const landlordRoute = Router();
landlordRoute.get("/landlords", getAllLandlords);
landlordRoute.get(
  "/properties",
  [authMiddleware],
  [landlordMiddleware],
  getLandlordProperties
);

landlordRoute.get(
  "/properties/:propertyId",
  [authMiddleware],
  [landlordMiddleware],
  getLandlordProperty
);
export default landlordRoute;
