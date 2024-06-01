"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
//import landlordRoute from "../Modules/landlord/route/route";
// import tenantRoute from "../Modules/tenant/route/route";
const appRouter = (0, express_1.Router)();
appRouter.use("/auth", auth_1.default);
// appRouter.use("/auth/tenant", tenantRoute);
exports.default = appRouter;
