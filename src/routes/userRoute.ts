import { Router } from "express";
import { login, signup } from "../controllers/auth";

const userRoute: Router = Router();
userRoute.post("/signup", signup);
userRoute.post("/login", login);

export default userRoute;
