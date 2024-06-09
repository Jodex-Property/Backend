import { Router } from "express";
import { getLandlordProperty } from "../controllers/landlord.js";
import { landlordMiddleware } from "../middleware/landlordMiddleware.js";

const landlordRoute = Router();

landlordRoute.get("/property", [landlordMiddleware], getLandlordProperty);

export default landlordRoute;
