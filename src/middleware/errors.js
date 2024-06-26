import { ErrorCodes, HttpException } from "../exception/root.js";

export const errorMiddleware = (error, req, res, next) => {
  res.json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
