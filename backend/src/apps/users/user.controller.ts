import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";

/** Route controller that handles fetching user session data */
export const getUserSession = catchAsync(
  async (_req: Request, res: Response) => {
    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "Retrieved user session data.",
      user: res.locals.user,
    });
  },
);
