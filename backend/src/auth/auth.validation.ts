import Joi from "joi";
import { BadAuthRequestError } from "../lib/appError";

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().error(new BadAuthRequestError()).required(),
  accessToken: Joi.string().optional(),
})
  .min(1)
  .max(2)
  .required();

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
  firstName: Joi.string().min(1).max(63).trim().required(),
  lastName: Joi.string().min(2).max(63).trim().required(),
  email: Joi.string().min(7).max(63).email().trim().lowercase().required(),
  password: Joi.string().min(8).max(63).required(),
}).required();

export const loginSchema = Joi.object({
  email: Joi.string().min(8).max(63).email().lowercase().required(),
  password: Joi.string().min(8).max(63).required(),
}).required();
