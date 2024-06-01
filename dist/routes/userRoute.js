"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const landlordRoute = (0, express_1.Router)();
landlordRoute.post("/signup", auth_1.signup);
landlordRoute.post("/login", auth_1.login);
exports.default = landlordRoute;
