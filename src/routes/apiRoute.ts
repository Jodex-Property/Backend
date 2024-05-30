import { Router } from "express";
import { login } from "../controllers/auth";
import landlordRoute from "../Modules/landlord/route/route";
import tenantRoute from "../Modules/tenant/route/route";

const appRouter: Router = Router();

appRouter.get("/auth", login);
appRouter.use("/auth/landlord", landlordRoute);
appRouter.use("/auth/tenant", tenantRoute);
export default appRouter;
