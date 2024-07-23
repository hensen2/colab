import { Request, NextFunction, Response } from "express";
import { verifyTokens } from "../lib/tokens";
import { BadTokensError, NotFoundError } from "../lib/appError";
import { getUserWithIds } from "../apps/users";
import catchAsync from "../utils/catchAsync";

const accessApi = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = verifyTokens(
      req.headers.authorization!,
      req.cookies.refreshToken,
    );

    if (!payload) {
      res.clearCookie("refreshToken");
      throw new BadTokensError("Invalid tokens: Token data doesn't match");
    }

    const { userId, workspaceId } = payload;

    const user = await getUserWithIds(userId, workspaceId);

    if (!user) {
      res.clearCookie("refreshToken");
      throw new NotFoundError("User not found");
    }

    res.locals = { workspaceId, user };

    next();
  },
);

export default accessApi;
