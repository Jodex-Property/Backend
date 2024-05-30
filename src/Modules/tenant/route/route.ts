import { Router } from "express";
import { login } from "../controller/auth";

const tenantRoute: Router = Router();
tenantRoute.post("/login", login);

export default tenantRoute;
