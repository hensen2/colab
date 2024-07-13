import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";
import logger from "../lib/logger";

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err);

  const { errorType, message } = err;

  const response = {
    errorType,
    message,
  };

  res.status(400).send(response);
};

export default errorHandler;
