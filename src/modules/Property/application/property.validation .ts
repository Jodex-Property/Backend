import { Joi } from "express-validation";

export const createPropertyValidation = {
  body: Joi.object({
    state: Joi.string().required(),
    houseType: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    flat: Joi.string().required(),
    pictures: Joi.string().required(),
    unit: Joi.string().required(),
    rooms: Joi.string().required(),
    bath: Joi.string().required(),
    kitchen: Joi.string().required(),
    diningRoom: Joi.string().required(),
    garage: Joi.string().required(),
    zipCode: Joi.string().required(),
    wifi: Joi.string().required(),
  }),
};
