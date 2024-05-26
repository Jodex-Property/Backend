import express from "express";
import { LandlordRoutes } from "../modules/Landlord/application/landlord.controller";
import { TenantRoutes } from "../modules/Tenant/application/tenant.controller";
import { PropertyRoutes } from "../modules/Property/application/property.controller";
const propertyRoutes = new PropertyRoutes();
const landlordRoutes = new LandlordRoutes();
const tenantRoutes = new TenantRoutes();

const v1Api = express.Router();
v1Api.use("/v1/landlord", landlordRoutes.getRouters());
v1Api.use("/v1/tenant", tenantRoutes.getRouters());
v1Api.use("/v1/landlord", propertyRoutes.getRouters());

export default v1Api;
