import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";
import logger from "../lib/logger";

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // log error first
  logger.error(err);
  console.log(err.stack);

  // if error encountered after writing response to client, send error to default express handler
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    const { errorType, statusCode, message } = err;

    return res.status(statusCode).json({
      errorType,
      message,
    });
  } else {
    next(err);
  }
};

export default errorHandler;
