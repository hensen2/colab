import { NextFunction, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../lib/tokens";
import { BadTokenError } from "../lib/appError";
import { getUserById } from "../apps/users";
import catchAsync from "../utils/catchAsync";
import User from "../apps/users/user.model";
import { ProtectedRequest } from "../types/request.types";

const accessApi = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const authHeader = req.headers.authorization as string;
    const accessToken = authHeader.split(" ")[1];

    const accessTokenPayload = verifyAccessToken(accessToken);
    const refreshTokenPayload = verifyRefreshToken(refreshToken);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      res.clearCookie("refreshToken");
      throw new BadTokenError("Invalid token data");
    }

    const user = (await getUserById(accessTokenPayload.sub!)) as User;

    if (!user) {
      res.clearCookie("refreshToken");
      throw new BadTokenError();
    }

    req.user = user;

    next();
  },
);

export default accessApi;
