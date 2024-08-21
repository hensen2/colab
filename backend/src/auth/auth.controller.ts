import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateTokens,
  verifyRefreshToken,
} from "../lib/tokens";
import {
  AuthFailureError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../lib/appError";
import { createUser, getUserByEmail, getUserWithIds } from "../apps/users";
import { StatusCode, StatusType } from "../types/response.types";
import { createWorkspace } from "../apps/workspaces";
import { runTransaction } from "../db/runTransaction";
import { createPermission, getPermissionWithIds } from "../apps/permissions";

// For expiring cookies in the browser
const oneHourMs = 3600000;
const oneDayMs = 86400000;

export const getToken = catchAsync(async (req: Request, res: Response) => {
  const { userId, workspaceId } = verifyRefreshToken(req.cookies.refreshToken);

  const user = await getUserWithIds(userId, workspaceId);

  if (!user) {
    res.clearCookie("refreshToken");
    throw new NotFoundError("User not found");
  }

  const permission = await getPermissionWithIds(userId, workspaceId);

  if (!permission) {
    res.clearCookie("refreshToken");
    throw new NotFoundError("User permissions not found");
  }

  const accessToken = generateAccessToken(userId, workspaceId, permission.role);

  return res
    .status(StatusCode.SUCCESS)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneHourMs, // expires cookie in 1h
    })
    .json({
      type: StatusType.SUCCESS,
      message: "Authenticated",
      accessToken,
      isAuthenticated: true,
    });
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const isUser = await getUserByEmail(email);

  if (isUser) {
    throw new ConflictError("User already exists using this email address");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Run a transaction to ensure all data is created
  await runTransaction(async (session) => {
    // Create new workspace
    const [workspace] = await createWorkspace(
      {
        name: `${firstName}'s Workspace`,
        createdBy: email,
      },
      { session },
    );

    if (!workspace) {
      throw new BadRequestError(
        "Bad request: Unable to setup new user account",
      );
    }

    res.locals.workspaceId = workspace.id;

    // Create new user
    const [user] = await createUser(
      {
        firstName,
        lastName,
        email,
        passwordHash,
        workspaces: [workspace.id],
      },
      { session },
    );

    if (!user) {
      throw new BadRequestError(
        "Bad request: Unable to create new user account",
      );
    }

    res.locals.user = user;

    // Create new user permission
    const [permission] = await createPermission(
      {
        workspaceId: workspace.id,
        userId: user.id,
        role: "admin",
      },
      { session },
    );

    if (!permission) {
      throw new BadRequestError(
        "Bad request: Unable to create new user permissions",
      );
    }

    res.locals.role = permission.role;
  });

  const { user, workspaceId, role } = res.locals;

  const { accessToken, refreshToken } = generateTokens(
    user.id,
    workspaceId,
    role,
  );

  return res
    .status(StatusCode.SUCCESS)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneDayMs, // expires cookie in 1d
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneHourMs, // expires cookie in 1h
    })
    .json({
      type: StatusType.SUCCESS,
      message: "User account created",
      accessToken,
      isAuthenticated: true,
    });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthFailureError("Invalid email address");
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw new AuthFailureError("Invalid password attempt");
  }

  const permission = await getPermissionWithIds(
    user.id,
    user.workspaces[0].toString(),
  );

  if (!permission) {
    throw new AuthFailureError("User permissions not allowed");
  }

  const { accessToken, refreshToken } = generateTokens(
    user.id,
    user.workspaces[0],
    permission.role,
  );

  return res
    .status(StatusCode.SUCCESS)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneDayMs, // expires cookie in 1d
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneHourMs, // expires cookie in 1h
    })
    .json({
      type: StatusType.SUCCESS,
      message: "User logged in",
      accessToken,
      isAuthenticated: true,
    });
});

export const logout = (_req: Request, res: Response) => {
  return res
    .status(StatusCode.SUCCESS)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json({
      type: StatusType.SUCCESS,
      message: "User logged out",
      accessToken: null,
      isAuthenticated: false,
    });
};
