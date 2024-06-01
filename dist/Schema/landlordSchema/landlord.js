"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordSignUpSchema = void 0;
const zod_1 = require("zod");
exports.LandlordSignUpSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});