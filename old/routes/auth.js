import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";

const userRoute = Router();
userRoute.post("/signup", errorHandler(signup));
userRoute.post("/login", errorHandler(login));

export default userRoute;
