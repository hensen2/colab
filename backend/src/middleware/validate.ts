import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../utils/appError";

const validate =
  (schema: Joi.ObjectSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.cookies);

    if (error) {
      return next(
        new AppError("Unauthenticated", 401, "No refresh token in cookies"),
      );
    }

    return next();
  };

export default validate;
