import express from "express";
import { LandlordRoutes } from "../modules/Landlord/application/landlord.controller";
import { TenantRoutes } from "../modules/Tenant/application/tenant.controller";

const landlordRoutes = new LandlordRoutes();
const tenantRoutes = new TenantRoutes();

const v1Api = express.Router();
v1Api.use("/v1/school", landlordRoutes.getRouters());
v1Api.use("/v1/tenant", tenantRoutes.getRouters());

export default v1Api;
