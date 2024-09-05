import { Request, NextFunction, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../lib/appError";
import { RequestSource } from "../types/request.types";

/** Middleware that validates all input payload data by source. */
const validate =
  (schema: Joi.AnySchema, source: RequestSource = RequestSource.BODY) =>
  (req: Request, _res: Response, next: NextFunction) => {
    // Validate passed schema for given source
    const { error } = schema.validate(req[source]);

    if (error) {
      return next(new BadRequestError());
    }

    next();
  };

export default validate;
