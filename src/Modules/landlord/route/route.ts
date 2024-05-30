import { Router } from "express";
import { login } from "../controller/auth";

const landlordRoute: Router = Router();
landlordRoute.post("/login", login);

export default landlordRoute;
