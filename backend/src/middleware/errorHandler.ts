import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import logger from "../lib/logger";

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err);

  const { type, statusCode, message } = err;

  const response = {
    type,
    message,
  };

  res.status(statusCode).send(response);
};

export default errorHandler;
