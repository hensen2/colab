import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/tokens";
import {
  AuthFailureError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../lib/appError";
import { createUser, getUserByEmail, getUserById } from "../apps/users";
import { StatusCode, StatusType } from "../types/response.types";
import { createWorkspace } from "../apps/workspaces";
import { runTransaction } from "../db/runTransaction";
import { AuthRequest } from "../types/request.types";

export const getToken = catchAsync(async (req: Request, res: Response) => {
  const payload = verifyRefreshToken(req.cookies.refreshToken);
  const user = await getUserById(payload.sub!);

  if (!user) {
    res.clearCookie("refreshToken");
    throw new NotFoundError("User not found");
  }

  const accessToken = generateAccessToken(payload.sub!);

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Authenticated",
    accessToken,
    user,
    isAuthenticated: true,
  });
});

export const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const isUser = await getUserByEmail(email);

  if (isUser) {
    throw new ConflictError("User already exists using this email address");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await runTransaction(async (session) => {
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

    const [user] = await createUser(
      {
        firstName,
        lastName,
        email,
        passwordHash,
        workspace: {
          id: workspace.id,
          name: workspace.name,
        },
      },
      { session },
    );

    if (!user) {
      throw new BadRequestError(
        "Bad request: Unable to create new user account",
      );
    }

    req.user = user;
  });

  const { user } = req;

  const accessToken = generateAccessToken(user!.id);
  const refreshToken = generateRefreshToken(user!.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "User account created",
    accessToken,
    user,
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

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "User logged in",
    accessToken,
    user: {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
    isAuthenticated: true,
  });
});

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "User logged out",
    accessToken: null,
    user: null,
    isAuthenticated: false,
  });
};
