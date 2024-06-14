import { Router } from "express";
import authRoutes from "./auth.js";
import propertyRouter from "./property.js";
import landlordRoute from "./landlord.js";
import tenantRoutes from "./tenant.js";
import userRoute from "./user.js";

const appRoute = Router();

appRoute.use("/auth", authRoutes);
//appRoute.use("auth", propertyRouter);
appRoute.use("/property", propertyRouter);
appRoute.use("/landlord", landlordRoute);
appRoute.use("/tenant", tenantRoutes);
appRoute.use("/users", userRoute);

export default appRoute;
