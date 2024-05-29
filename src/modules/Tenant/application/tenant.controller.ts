import { Router } from "express";
import { AuthMiddleware } from "../../../middlewares/authToken";
import { TenantAuthServices } from "../services/tenant.auth.services";
import { validate } from "express-validation";
import { createTenantValidation } from "./validation";

export class TenantRoutes {
  private auth = new AuthMiddleware();
  private authService = new TenantAuthServices();
  //   private student = new StudentService();
  //   private parentStory = new AdminParentStory();
  //   private management = new ParentManagement();
  //   private parentResult = new ParentResult();
  private router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  private initRoutes() {
    this.authRoutes();
  }

  private authRoutes() {
    this.router.post(
      "/auth/signup",
      validate(createTenantValidation),
      this.authService.signup
    );
    this.router.post(
      "/auth/login",
      validate(createTenantValidation),
      this.authService.login
    );
  }
  getRouters() {
    return this.router;
  }
}
