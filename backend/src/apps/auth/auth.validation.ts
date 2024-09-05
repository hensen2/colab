import Joi from "joi";
import { BadAuthRequestError, BadTokensError } from "../../lib/appError";

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().error(new BadAuthRequestError()).required(),
  accessToken: Joi.string().optional(),
  sid: Joi.string().error(new BadAuthRequestError()).required(),
})
  .min(2)
  .max(3)
  .required();

export const accessSchema = Joi.object({
  refreshToken: Joi.string().error(new BadTokensError()).required(),
  accessToken: Joi.string().error(new BadTokensError()).required(),
  sid: Joi.string().error(new BadTokensError()).required(),
})
  .length(3)
  .required();

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
