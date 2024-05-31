"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const route_1 = __importDefault(require("../Modules/landlord/route/route"));
const route_2 = __importDefault(require("../Modules/tenant/route/route"));
const appRouter = (0, express_1.Router)();
appRouter.get("/auth", auth_1.login);
appRouter.use("/auth/landlord", route_1.default);
appRouter.use("/auth/tenant", route_2.default);
exports.default = appRouter;
