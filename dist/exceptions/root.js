"use strict";
//message status code error code error
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCodes[ErrorCodes["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCodes[ErrorCodes["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
