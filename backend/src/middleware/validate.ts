import { NextFunction, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../lib/appError";
import { PublicRequest } from "../types/request.types";

export enum RequestSource {
  BODY = "body",
  HEADER = "headers",
  COOKIE = "cookies",
  QUERY = "query",
  PARAM = "params",
}

const validate =
  (schema: Joi.ObjectSchema<any>, source: RequestSource = RequestSource.BODY) =>
  (req: PublicRequest, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);

    if (error) {
      return next(new BadRequestError());
    }

    return next();
  };

export default validate;
