import { Joi } from "express-validation";

export const createLandlordValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
