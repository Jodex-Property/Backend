import { Router } from "express";
import { signup } from "../controller/auth";
//import { login } from "../controller/auth";

const tenantRoute: Router = Router();
tenantRoute.post("/signup", signup);

export default tenantRoute;
