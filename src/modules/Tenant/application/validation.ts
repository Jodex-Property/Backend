import { Joi } from "express-validation";
export const createTenantValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    userName: Joi.string().required(),
  }),
};
