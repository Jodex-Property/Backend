import { Router } from "express";
import { login, me, signup } from "../controllers/auth.js";
import { errorHandler } from "../error-handler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRoute = Router();

authRoute.post("/signup", errorHandler(signup));
authRoute.post("/login", errorHandler(login));
authRoute.get("/me", [authMiddleware], errorHandler(me));

export default authRoute;
