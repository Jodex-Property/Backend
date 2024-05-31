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
const app_1 = require("../../../app");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../../../secrets");
const badReuest_1 = require("../../../exceptions/badReuest");
const root_1 = require("../../../exceptions/root");
const validation_1 = require("../../../exceptions/validation");
const landlord_1 = require("../../../Schema/landlordSchema/landlord");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        landlord_1.LandlordSignUpSchema.parse(req.body);
        const { email, password, userName } = req.body;
        let landlord = yield app_1.prisma.landlord.findFirst({ where: { email } });
        if (landlord) {
            next(new badReuest_1.BadRequests("Landlord already exists", root_1.ErrorCodes.USER_ALREADY_EXISTS));
        }
        landlord = yield app_1.prisma.landlord.create({
            data: {
                email,
                password: (0, bcrypt_1.hashSync)(password, 10),
                userName,
            },
        });
        res.status(201).json({ landlord });
    }
    catch (err) {
        next(new validation_1.UnprocessableEntity(err === null || err === void 0 ? void 0 : err.issues, "Unprocessable error", root_1.ErrorCodes.UNPROCESSABLE_ENTITY));
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let landlord = yield app_1.prisma.landlord.findFirst({ where: { email } });
    if (!landlord) {
        throw Error("Landlord does not exist");
    }
    if (!(0, bcrypt_1.compareSync)(password, landlord.password)) {
        throw Error("incorrect password");
    }
    const token = jwt.sign({ userId: landlord.id }, secrets_1.JWT_SECRET);
    res.status(201).json({ landlord, token });
});
exports.login = login;
