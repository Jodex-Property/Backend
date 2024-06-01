import { Router } from "express";
import { login, signup } from "../controllers/auth";
import userRoute from "./userRoute";
//import landlordRoute from "../Modules/landlord/route/route";
// import tenantRoute from "../Modules/tenant/route/route";

const appRouter: Router = Router();

appRouter.use("/auth", userRoute);
// appRouter.use("/auth/tenant", tenantRoute);
export default appRouter;
