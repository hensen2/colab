import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenInfo } from "./config";
import { isObjectIdOrHexString, Types } from "mongoose";
import { AccessTokenError, RefreshTokenError } from "./appError";

export interface ITokenPayload extends JwtPayload {
  workspaceId?: string;
  role?: "admin" | "user";
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
    !payload.role ||
    !isObjectIdOrHexString(payload.sub) ||
    !isObjectIdOrHexString(payload.workspaceId)
  ) {
    throw new AccessTokenError();
  } else {
    return {
      userId: payload.sub,
      workspaceId: payload.workspaceId,
      role: payload.role,
    };
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
    !payload.role ||
    !isObjectIdOrHexString(payload.sub) ||
    !isObjectIdOrHexString(payload.workspaceId)
  ) {
    throw new RefreshTokenError();
  } else {
    return {
      userId: payload.sub,
      workspaceId: payload.workspaceId,
      role: payload.role,
    };
  }
};

export const verifyTokens = (accessToken: string, refreshToken: string) => {
  const aPayload = verifyAccessToken(accessToken);
  const rPayload = verifyRefreshToken(refreshToken);

  if (
    aPayload.userId !== rPayload.userId ||
    aPayload.workspaceId !== rPayload.workspaceId ||
    aPayload.role !== rPayload.role
  ) {
    return null;
  } else {
    return {
      userId: aPayload.userId,
      workspaceId: aPayload.workspaceId,
      role: aPayload.role,
    };
  }
};

export const generateAccessToken = (
  userId: string,
  workspaceId: string | Types.ObjectId,
  role: "admin" | "user",
) => {
  return jwt.sign({ workspaceId, role }, accessKey, {
    expiresIn: "1h",
    subject: userId,
    audience,
    issuer,
  });
};

export const generateRefreshToken = (
  userId: string,
  workspaceId: string | Types.ObjectId,
  role: "admin" | "user",
) => {
  return jwt.sign({ workspaceId, role }, refreshKey, {
    expiresIn: "1d",
    subject: userId,
    audience,
    issuer,
  });
};

export const generateTokens = (
  userId: string,
  workspaceId: string | Types.ObjectId,
  role: "admin" | "user",
) => {
  const accessToken = generateAccessToken(userId, workspaceId, role);
  const refreshToken = generateRefreshToken(userId, workspaceId, role);

  return { accessToken, refreshToken };
};
