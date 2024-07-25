import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";

export const getUser = catchAsync(async (_req: Request, res: Response) => {
  const { user } = res.locals;

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved user data",
    user,
  });
});
