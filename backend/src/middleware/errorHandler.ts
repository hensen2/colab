import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";
import logger from "../lib/logger";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if error encountered after writing response to client, send error to default express handler
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    const { errorType, statusCode, message } = err;

    if (req.originalUrl === "/auth") {
      res.status(statusCode).json({
        errorType,
        message,
      });
    } else {
      res.status(statusCode).json({
        errorType,
        message,
      });
    }
  }
  logger.error(err);
  return;
};

export default errorHandler;
