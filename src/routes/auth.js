import { Router } from "express";
import { login, me, signup } from "../controllers/auth.js";
import { errorMiddleware } from "../middleware/errors.js";
import { errorHandler } from "../error-handler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", login);
authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
