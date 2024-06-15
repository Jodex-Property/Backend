import * as agentController from "../Modules/Agent/agentController.js";

import { Router } from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";

const agentRoute = Router();

agentRoute.get(
  "/agentProperties",
  [authMiddleware],
  authorize("ADMIN", "LANDLORD"),
  agentController.getPropertiesByAgentController
);

export default agentRoute;
