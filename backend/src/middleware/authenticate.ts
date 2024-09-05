import { Request, NextFunction, Response } from "express";
import { verifyAuthTokens } from "../lib/tokens";
import { BadTokensError, NotFoundError } from "../lib/appError";
import { getUserByIdAndEmail } from "../apps/users";
import catchAsync from "../utils/catchAsync";

/** Middleware function verifies user authentication for all protected API requests. */
const authenticate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    const payload = verifyAuthTokens(accessToken, refreshToken);

    // If auth tokens are invalid, then log user out
    if (!payload) {
      res.clearCookie("refreshToken").clearCookie("accessToken");
      throw new BadTokensError(
        "Invalid authentication payload. Please enter credentials again.",
      );
    }

    const { userId, email } = payload;

    const user = await getUserByIdAndEmail(userId, email);

    if (!user) {
      res.clearCookie("refreshToken").clearCookie("accessToken");
      throw new NotFoundError(
        "User not found while authenticating API request.",
      );
    }

    // Sets user authentication data for current request
    res.locals.user = user;

    next();
  },
);

export default authenticate;
