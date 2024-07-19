import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenInfo } from "./config";
import { isObjectIdOrHexString, Types } from "mongoose";
import { AccessTokenError, RefreshTokenError } from "./appError";

export interface ITokenPayload extends JwtPayload {
  workspaceId?: string;
}

const { accessKey, refreshKey, issuer, audience } = tokenInfo;

export const verifyAccessToken = (accessToken: string) => {
  const payload = jwt.verify(accessToken, accessKey, {
    audience,
    issuer,
  }) as ITokenPayload;

  if (
    !payload.sub ||
    !payload.workspaceId ||
    !isObjectIdOrHexString(payload.sub) ||
    !isObjectIdOrHexString(payload.workspaceId)
  ) {
    throw new AccessTokenError();
  } else {
    return { userId: payload.sub, workspaceId: payload.workspaceId };
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, refreshKey, {
    audience,
    issuer,
  }) as ITokenPayload;

  if (
    !payload.sub ||
    !payload.workspaceId ||
    !isObjectIdOrHexString(payload.sub) ||
    !isObjectIdOrHexString(payload.workspaceId)
  ) {
    throw new RefreshTokenError();
  } else {
    return { userId: payload.sub, workspaceId: payload.workspaceId };
  }
};

export const verifyTokens = (accessToken: string, refreshToken: string) => {
  const aPayload = verifyAccessToken(accessToken);
  const rPayload = verifyRefreshToken(refreshToken);

  if (
    aPayload.userId !== rPayload.userId ||
    aPayload.workspaceId !== rPayload.workspaceId
  ) {
    return null;
  } else {
    return { userId: aPayload.userId, workspaceId: aPayload.workspaceId };
  }
};

export const generateAccessToken = (
  userId: string,
  workspaceId: string | Types.ObjectId,
) => {
  return jwt.sign({ workspaceId }, accessKey, {
    expiresIn: "1h",
    subject: userId,
    audience,
    issuer,
  });
};

export const generateRefreshToken = (
  userId: string,
  workspaceId: string | Types.ObjectId,
) => {
  return jwt.sign({ workspaceId }, refreshKey, {
    expiresIn: "1d",
    subject: userId,
    audience,
    issuer,
  });
};

export const generateTokens = (
  userId: string,
  workspaceId: string | Types.ObjectId,
) => {
  const accessToken = generateAccessToken(userId, workspaceId);
  const refreshToken = generateRefreshToken(userId, workspaceId);

  return { accessToken, refreshToken };
};
