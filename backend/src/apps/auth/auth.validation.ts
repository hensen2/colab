import Joi from "joi";

export const tokenSchema = Joi.object({
  cookies: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}).unknown(true);

export const registerSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
  }),
}).unknown(true);

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
  }),
}).unknown(true);
