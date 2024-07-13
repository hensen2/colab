import { Request, Response, NextFunction } from "express";
import { ProtectedRequest, PublicRequest } from "../types/request.types";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export default (execution: AsyncFunction) =>
  (
    req: Request | PublicRequest | ProtectedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    execution(req, res, next).catch(next);
  };
