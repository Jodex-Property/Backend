import express from "express";
import { LandlordRoutes } from "../modules/Landlord/application/landlord.controller";

const landlordRoutes = new LandlordRoutes();

const v1Api = express.Router();
v1Api.use("/v1/school", landlordRoutes.getRouters());

export default v1Api;
