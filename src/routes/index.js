import { Router } from "express";
import authRoutes from "./auth.js";
import propertyRouter from "./property.js";
import landlordRoute from "./landlord.js";

const appRoute = Router();

appRoute.use("/auth", authRoutes);
appRoute.use("auth", propertyRouter);
appRoute.use("/property", propertyRouter);
appRoute.use("/landlord", landlordRoute);

export default appRoute;
