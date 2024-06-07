import { Router } from "express";
import { newProperty } from "../controllers/property.js";

const propertyRouter = Router();

propertyRouter.post("/", newProperty);

export default propertyRouter;
