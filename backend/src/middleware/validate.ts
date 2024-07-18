import { NextFunction, Response } from "express";
import Joi from "joi";
import { BadAuthRequestError, BadRequestError } from "../lib/appError";
import { AuthRequest, RequestSource } from "../types/request.types";
import { StatusCode, StatusType } from "../types/response.types";

const validate =
  (schema: Joi.AnySchema, source: RequestSource = RequestSource.BODY) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);

    if (error) {
      // If public route '/auth' and no refresh token, return unauth state
      if (req.originalUrl === "/auth" && error instanceof BadAuthRequestError) {
        return res.status(StatusCode.SUCCESS).json({
          type: StatusType.NO_REFRESH_TOKEN,
          message: "Credentials required",
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      }
      return next(new BadRequestError());
    }

    next();
  };

export default validate;
