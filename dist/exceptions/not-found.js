"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const root_1 = require("./root");
class NotFound extends root_1.HttpException {
    constructor(message, errorCode) {
        super(message, errorCode, 404, null);
    }
}
exports.NotFound = NotFound;
