"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
//import { login } from "../controller/auth";
const tenantRoute = (0, express_1.Router)();
tenantRoute.post("/signup", auth_1.signup);
tenantRoute.post("/login", auth_1.login);
exports.default = tenantRoute;
