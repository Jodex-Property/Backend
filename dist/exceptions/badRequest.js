"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequests = void 0;
const root_1 = require("./root");
class BadRequests extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 400, null);
    }
}
exports.BadRequests = BadRequests;
