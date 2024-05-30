import { Router } from "express";
import { login, signup } from "../controller/auth";
//import { login } from "../controller/auth";

const tenantRoute: Router = Router();
tenantRoute.post("/signup", signup);
tenantRoute.post("/login", login);

export default tenantRoute;
