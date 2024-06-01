import { Router } from "express";
import { login, signup } from "../controllers/auth";

const landlordRoute: Router = Router();
landlordRoute.post("/signup", signup);
landlordRoute.post("/login", login);

export default landlordRoute;
