"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const apiRoute_1 = __importDefault(require("./routes/apiRoute"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.options("*", (0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Welcome to Jodex property app");
});
app.use("/api/v1", apiRoute_1.default);
exports.prisma = new client_1.PrismaClient({
    log: ["query"],
});
app.listen(secrets_1.PORT, () => {
    console.log("App is working");
});
