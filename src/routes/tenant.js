import { Router } from "express";
import { getAllTenants } from "../controllers/tenant.js";

const tenantRoutes = Router();

tenantRoutes.get("/", getAllTenants);

export default tenantRoutes;
