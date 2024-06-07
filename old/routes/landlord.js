import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { InternalException } from "../exception/internal-exception.js";
import {
  getAllLandlords,
  getLandlordById,
} from "../controllers/landlord.controller.js";
import { errorHandler } from "../error-handler.js";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

const landlordRoute = Router();

landlordRoute.get(
  "/",
  [authMiddleware, tenantMiddleware],
  errorHandler(getAllLandlords)
);

landlordRoute.get(
  "/:d",
  [authMiddleware, tenantMiddleware],
  errorHandler(getLandlordById)
);
export default landlordRoute;
