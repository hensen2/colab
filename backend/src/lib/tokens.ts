import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenInfo } from "./config";
import { Types } from "mongoose";
import { AppError } from "./appError";

const { accessKey, refreshKey, issuer, audience } = tokenInfo;

export const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  const payload = jwt.verify(refreshToken, tokenInfo.refreshKey, {
    audience,
    issuer,
  }) as JwtPayload;

  if (!payload.sub || !Types.ObjectId.isValid(payload.sub)) {
    throw new AppError("Failure", 401, "Invalid refresh token");
  } else {
    return payload;
  }
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ sub: userId }, accessKey, {
    expiresIn: "1h",
    audience,
    issuer,
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ sub: userId }, refreshKey, {
    expiresIn: "1d",
    audience,
    issuer,
  });
};
