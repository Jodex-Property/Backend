import { Router } from "express";
import authRoutes from "./auth.js";
import propertyRouter from "./property.js";

const appRoute = Router();

appRoute.use("/auth", authRoutes);
appRoute.use("auth", propertyRouter);

export default appRoute;
