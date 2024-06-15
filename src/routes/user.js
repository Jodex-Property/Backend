import { Router } from "express";
import multer from "multer";

import * as userController from "../Modules/Users/users.controller.js";
import { errorHandler } from "../error-handler.js";

const userRoute = Router();

// userRoute.put(
//   "/update",
//   authenticate,
//   upload.single("profilePicture"),
//   userController.updateUser
// );
userRoute.get("/", userController.getAllUsers);

export default userRoute;
