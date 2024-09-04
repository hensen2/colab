import { Request, NextFunction, Response } from "express";
import { verifyTokens } from "../lib/tokens";
import { BadTokensError, NotFoundError } from "../lib/appError";
import { getUserWithTokenData } from "../apps/users";
import catchAsync from "../utils/catchAsync";

const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = verifyTokens(
      req.cookies.accessToken!,
      req.cookies.refreshToken,
    );

    if (!payload) {
      res.clearCookie("refreshToken").clearCookie("accessToken");
      throw new BadTokensError("Invalid tokens: Token data doesn't match");
    }

    const { userId, workspaceId, role } = payload;

    const user = await getUserWithTokenData(userId, workspaceId);

    if (!user) {
      res.clearCookie("refreshToken").clearCookie("accessToken");
      throw new NotFoundError("User not found");
    }

    res.locals = { workspaceId, user, role };

    next();
  },
);

export default authenticate;
