"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
//import landlordRoute from "../Modules/landlord/route/route";
// import tenantRoute from "../Modules/tenant/route/route";
const appRouter = (0, express_1.Router)();
appRouter.use("/auth", userRoute_1.default);
// appRouter.use("/auth/tenant", tenantRoute);
exports.default = appRouter;
