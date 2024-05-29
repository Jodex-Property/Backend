import { Router } from "express";
import { LandlordAuthLogics } from "../services/landlord.auth";
import { validate } from "express-validation";
import { createLandlordValidation } from "./landlord.validation";
import { AuthMiddleware } from "../../../middlewares/authToken";

export class LandlordRoutes {
  private router: Router;
  private authService: LandlordAuthLogics;
  private auth: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authService = new LandlordAuthLogics();
    this.auth = new AuthMiddleware();
    this.initAuthRoutes();
  }
  private initAuthRoutes() {
    this.router.post(
      "/auth/signup",
      validate(createLandlordValidation),
      this.authService.signup
    );
    this.router.post("/auth/login", this.authService.login);
  }

  public getRouters() {
    return this.router;
  }
}
