import { Router } from "express";
import { PropertyServices } from "../services/property.services";
import { validate } from "express-validation";
import { createPropertyValidation } from "./property.validation ";
import { AuthMiddleware } from "../../../middlewares/authToken";

export class PropertyRoutes {
  private router: Router;
  private propertyServices = new PropertyServices();
  private auth = new AuthMiddleware();

  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  private initRoutes() {
    this.router.post(
      "/:landlordId/addProperty",
      this.auth.Auth,
      validate(createPropertyValidation),
      this.auth.landlordAuth,
      this.propertyServices.addProperty
    );
  }
  getRouters() {
    return this.router;
  }
}
