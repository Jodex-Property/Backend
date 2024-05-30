import { Router } from "express";
import { signup } from "../controller/auth";

const landlordRoute: Router = Router();
landlordRoute.post("/signup ", signup);

export default landlordRoute;
