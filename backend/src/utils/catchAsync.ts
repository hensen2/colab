import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/request.types";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export default (execution: AsyncFunction) =>
  (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
