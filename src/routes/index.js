import { Router } from "express";
import authRoute from "./auth.js";
//import { createProperty } from "../controllers/property.Controller.js";
import propertyRoute from "./property.js";
import landlordRoute from "./landlord.js";
const appRoute = Router();

appRoute.use("/auth", authRoute);
appRoute.use("/property", propertyRoute);
appRoute.use("/landlords", landlordRoute);

export default appRoute;
