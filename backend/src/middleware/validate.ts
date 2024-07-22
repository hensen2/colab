import { Request, NextFunction, Response } from "express";
import Joi from "joi";
import { BadAuthRequestError, BadRequestError } from "../lib/appError";
import { RequestSource } from "../types/request.types";
import { StatusCode, StatusType } from "../types/response.types";

const validate =
  (schema: Joi.AnySchema, source: RequestSource = RequestSource.BODY) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source]);

    if (error) {
      // if route is '/auth' and no refresh token found, return unauth state
      if (req.originalUrl === "/auth" && error instanceof BadAuthRequestError) {
        return res.status(StatusCode.SUCCESS).json({
          type: StatusType.NO_REFRESH_TOKEN,
          message: "Credentials required",
          workspaceId: null,
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      }

      return next(new BadRequestError());
    }

    // if base route is '/api' and auth headers correct, set req data
    if (req.baseUrl === "/api" && value.authorization) {
      req.headers.authorization = value.authorization;
    }

    next();
  };

export default validate;
