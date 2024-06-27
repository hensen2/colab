import Joi from "joi";

export const refreshSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
});
