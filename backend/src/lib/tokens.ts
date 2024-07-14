import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenInfo } from "./config";
import { Types } from "mongoose";
import { AccessTokenError, RefreshTokenError } from "./appError";

const { accessKey, refreshKey, issuer, audience } = tokenInfo;

export const verifyAccessToken = (accessToken: string): JwtPayload => {
  const payload = jwt.verify(accessToken, accessKey, {
    audience,
    issuer,
  }) as JwtPayload;

  if (!payload.sub || !Types.ObjectId.isValid(payload.sub)) {
    throw new AccessTokenError();
  } else {
    return payload;
  }
};

export const verifyRefreshToken = (refreshToken: string): JwtPayload => {
  const payload = jwt.verify(refreshToken, refreshKey, {
    audience,
    issuer,
  }) as JwtPayload;

  if (!payload.sub || !Types.ObjectId.isValid(payload.sub)) {
    throw new RefreshTokenError();
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
