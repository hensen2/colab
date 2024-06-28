import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../lib/appError";

const validate =
  (schema: Joi.ObjectSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req);

    if (error) {
      return next(new AppError("Failure", 401, "Bad request"));
    }

    return next();
  };

export default validate;
