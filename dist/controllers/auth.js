"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const app_1 = require("../app");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const badRequest_1 = require("../exceptions/badRequest");
const root_1 = require("../exceptions/root");
const user_1 = require("../Schema/Schema/user");
const not_found_1 = require("../exceptions/not-found");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.SignUpSchema.parse(req.body);
    const { email, password, passwordConfirm, userName } = req.body;
    if (password !== passwordConfirm) {
        throw new badRequest_1.BadRequests("Passwords do no match", root_1.ErrorCodes.INCORRECT_PASSWORD);
    }
    let user = yield app_1.prisma.user.findFirst({ where: { email } });
    if (user) {
        new badRequest_1.BadRequests("User already exists", root_1.ErrorCodes.USER_ALREADY_EXISTS);
    }
    user = yield app_1.prisma.user.create({
        data: {
            email,
            password: (0, bcrypt_1.hashSync)(password, 10),
            userName,
            passwordConfirm: (0, bcrypt_1.hashSync)(passwordConfirm, 10),
            //  user: landlord,
        },
    });
    res.status(201).json({ user });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield app_1.prisma.user.findFirst({ where: { email } });
    if (!user) {
        throw new not_found_1.NotFound("User does not exist", root_1.ErrorCodes.USER_NOT_FOUND);
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        throw new badRequest_1.BadRequests("incorrect password", root_1.ErrorCodes.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({ userId: user.id }, secrets_1.JWT_SECRET);
    res.status(201).json({ user, token });
});
exports.login = login;
