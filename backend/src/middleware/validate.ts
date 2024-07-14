import { NextFunction, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../lib/appError";
import { PublicRequest, RequestSource } from "../types/request.types";

const validate =
  (schema: Joi.AnySchema, source: RequestSource = RequestSource.BODY) =>
  (req: PublicRequest, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);

    if (error) {
      return next(new BadRequestError());
    }

    next();
  };

export default validate;
