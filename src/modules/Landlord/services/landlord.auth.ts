import { RequestHandler } from "express";
import prisma from "../../../database/db";
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "../../../errors";
import { InternalServerError } from "../../../errors/internalServerError";
import { User } from "../../../users/user/user";
