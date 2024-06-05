import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "../exceptions/root";

export const errorMiddleware = (error, req, res, next) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
