import Joi from "joi";

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).required();

export const accessSchema = Joi.object({
  authorization: Joi.string()
    .custom((value: string, helpers) => {
      if (!value.startsWith("Bearer ")) {
        return helpers.error("Invalid auth header");
      }
      const accessToken = value.split(" ")[1];
      if (!accessToken) {
        return helpers.error("Invalid auth bearer");
      }
      return accessToken;
    })
    .required(),
}).unknown(true);

export const registerSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
}).required();

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
}).required();
