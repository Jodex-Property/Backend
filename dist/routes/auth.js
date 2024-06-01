"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const errorHandler_1 = require("../errorHandler");
const userRoute = (0, express_1.Router)();
userRoute.post("/signup", (0, errorHandler_1.errorHandler)(auth_1.signup));
userRoute.post("/login", (0, errorHandler_1.errorHandler)(auth_1.login));
exports.default = userRoute;
