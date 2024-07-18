import { NextFunction, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../lib/tokens";
import { BadTokensError, NotFoundError } from "../lib/appError";
import { getUserById } from "../apps/users";
import catchAsync from "../utils/catchAsync";
import { AuthRequest } from "../types/request.types";

const accessApi = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization as string;
    const accessToken = authHeader.split(" ")[1];

    const accessTokenPayload = verifyAccessToken(accessToken);
    const refreshTokenPayload = verifyRefreshToken(refreshToken);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      res.clearCookie("refreshToken");
      throw new BadTokensError("Invalid tokens: Token subjects don't match");
    }

    const user = await getUserById(accessTokenPayload.sub!);

    if (!user) {
      res.clearCookie("refreshToken");
      throw new NotFoundError("User not found");
    }

    req.user = user;

    next();
  },
);

export default accessApi;
