import jwt, { JwtPayload } from "jsonwebtoken";
import { isObjectIdOrHexString } from "mongoose";
import { tokenInfo } from "./config";
import {
  AccessTokenError,
  RefreshTokenError,
  WorkspaceTokenError,
} from "./appError";

export interface ITokenPayload extends JwtPayload {
  uid?: string; // userId
  wid?: string; // workspaceId
  role?: "admin" | "user";
}

// Extracts env token data from app config
const { accessKey, refreshKey, workspaceKey, issuer, audience } = tokenInfo;

/** Verifies access token and returns payload. */
export const verifyAccessToken = (accessToken: string) => {
  const payload = jwt.verify(accessToken, accessKey, {
    audience,
    issuer,
  }) as ITokenPayload;

  // Checks if necessary data is present and correct then returns data
  if (!payload.sub || !payload.uid || !isObjectIdOrHexString(payload.uid)) {
    throw new AccessTokenError();
  } else {
    return {
      userId: payload.uid,
      email: payload.sub,
    };
  }
};

/** Verifies refresh token and returns payload. */
export const verifyRefreshToken = (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, refreshKey, {
    audience,
    issuer,
  }) as ITokenPayload;

  // Checks if necessary data is present and correct then returns data
  if (!payload.sub || !payload.uid || !isObjectIdOrHexString(payload.uid)) {
    throw new RefreshTokenError();
  } else {
    return {
      userId: payload.uid,
      email: payload.sub,
    };
  }
};

/** Verifies refresh and access authentication tokens and returns payload. */
export const verifyAuthTokens = (accessToken: string, refreshToken: string) => {
  // Verify both tokens are still valid
  const aPayload = verifyAccessToken(accessToken);
  const rPayload = verifyRefreshToken(refreshToken);

  // Verify both payloads match and return if they do, else return null
  if (
    aPayload.userId !== rPayload.userId ||
    aPayload.email !== rPayload.email
  ) {
    return null;
  } else {
    return {
      userId: aPayload.userId,
      email: aPayload.email,
    };
  }
};

/** Verifies workspace session token and returns payload. */
export const verifyWorkspaceToken = (workspaceToken: string) => {
  const payload = jwt.verify(workspaceToken, workspaceKey, {
    audience,
    issuer,
  }) as ITokenPayload;

  // Checks if necessary data is present and correct then returns data
  if (
    !payload.sub ||
    !payload.uid ||
    !payload.wid ||
    !payload.role ||
    !isObjectIdOrHexString(payload.uid) ||
    !isObjectIdOrHexString(payload.wid)
  ) {
    throw new WorkspaceTokenError();
  } else {
    return {
      userId: payload.uid,
      email: payload.sub,
      workspaceId: payload.wid,
      role: payload.role,
    };
  }
};

/** Generates access authentication token and returns it. */
export const generateAccessToken = (userId: string, userEmail: string) => {
  return jwt.sign({ uid: userId }, accessKey, {
    expiresIn: "1h",
    subject: userEmail,
    audience,
    issuer,
  });
};

/** Generates refresh authentication token and returns it. */
export const generateRefreshToken = (userId: string, userEmail: string) => {
  return jwt.sign({ uid: userId }, refreshKey, {
    expiresIn: "1d",
    subject: userEmail,
    audience,
    issuer,
  });
};

/** Generates refresh and access authentication tokens and returns them. */
export const generateAuthTokens = (userId: string, userEmail: string) => {
  const accessToken = generateAccessToken(userId, userEmail);
  const refreshToken = generateRefreshToken(userId, userEmail);

  return { accessToken, refreshToken };
};

/** Generates workspace session token and returns it. */
export const generateWorkspaceToken = (
  userId: string,
  email: string,
  workspaceId: string,
  role: "admin" | "user",
) => {
  return jwt.sign({ uid: userId, wid: workspaceId, role }, workspaceKey, {
    expiresIn: "7d",
    subject: email,
    audience,
    issuer,
  });
};
