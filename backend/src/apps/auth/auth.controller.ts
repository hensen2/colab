import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import catchAsync from "../../utils/catchAsync";
import { expireTimes } from "../../lib/config";
import {
  generateAccessToken,
  generateAuthTokens,
  generateWorkspaceToken,
  verifyRefreshToken,
  verifyWorkspaceToken,
} from "../../lib/tokens";
import {
  AuthFailureError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../lib/appError";
import {
  createUser,
  getUserByEmail,
  getUserByIdAndEmail,
} from "../../apps/users";
import { createWorkspace } from "../../apps/workspaces";
import { createPermission, getPermissionByIds } from "../../apps/permissions";
import { runTransaction } from "../../db/runTransaction";
import { StatusCode, StatusType } from "../../types/response.types";

// Extract expiration constants
const { oneHourMs, oneDayMs, oneWeekMs } = expireTimes;

// Logic for refreshing access token
export const getAuthToken = catchAsync(async (req: Request, res: Response) => {
  // Verify refresh token is valid
  const { userId, email } = verifyRefreshToken(req.cookies.refreshToken);

  // Check if refresh token payload is correct by finding unique user
  const user = await getUserByIdAndEmail(userId, email);

  if (!user) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    throw new NotFoundError(
      "User could not be found with invalid refresh token data.",
    );
  }

  // Generates fresh access token with valid user data
  const accessToken = generateAccessToken(userId, email);

  // Refresh response access cookie and send data
  return res
    .status(StatusCode.SUCCESS)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneHourMs, // expires cookie in 1h
    })
    .json({
      type: StatusType.SUCCESS,
      message: "User authenticated.",
      isAuthenticated: true,
    });
});

// Logic for registering new users
export const register = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  // Checks if email is already taken
  const isUser = await getUserByEmail(email);

  if (isUser) {
    throw new ConflictError("User already exists with this email address.");
  }

  // Generate password hash to be stored in database
  const passwordHash = await bcrypt.hash(password, 10);

  // Run a transaction to ensure all data is created, or not at all
  await runTransaction(async (session) => {
    // Creates a new default workspace for the user to work in
    const [workspace] = await createWorkspace(
      {
        name: `${firstName}'s Workspace`,
        createdBy: email,
      },
      { session },
    );

    if (!workspace) {
      throw new BadRequestError("Unable to setup new user workspace.");
    }

    const workspaceId = workspace.id;

    // Creates a new user
    const [user] = await createUser(
      {
        firstName,
        lastName,
        email,
        passwordHash,
        workspaces: [workspaceId],
      },
      { session },
    );

    if (!user) {
      throw new BadRequestError("Unable to create new user account.");
    }

    const userId = user.id;

    // Creates a new admin permission for the user's default workspace
    const [permission] = await createPermission(
      {
        workspaceId,
        userId,
        role: "admin",
      },
      { session },
    );

    if (!permission) {
      throw new BadRequestError("Unable to create new user permissions.");
    }

    // Set locals object with user data to be used out of transaction scope
    res.locals = { userId, workspaceId, role: permission.role };
  });

  const { userId, workspaceId, role } = res.locals;

  // Generates fresh auth tokens using user data
  const { accessToken, refreshToken } = generateAuthTokens(userId, email);

  // Generates fresh workspace session token
  const workspaceToken = generateWorkspaceToken(
    userId,
    email,
    workspaceId,
    role,
  );

  // Set response cookies and send data
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
    .cookie("sid", workspaceToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneWeekMs, // expires cookie in 7d
    })
    .json({
      type: StatusType.SUCCESS,
      message: "New user account created.",
      isAuthenticated: true,
    });
});

// Logic for user login
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Checks if user exists for email and returns user data
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthFailureError("No user account found for this email address.");
  }

  // Checks if login password is correct and matches hash
  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw new AuthFailureError("Incorrect password entered, please try again.");
  }

  // Generates fresh auth tokens using user data
  const { accessToken, refreshToken } = generateAuthTokens(user.id, user.email);

  // Verify workspace session if it exists to load recent session, else load default session
  if (req.cookies.sid) {
    const { workspaceId, role } = verifyWorkspaceToken(req.cookies.sid);

    // Set locals to be used out of scope
    res.locals = { workspaceId, role };
  } else {
    const workspaceId = user.workspaces[0].toString();

    // Fetch default user workspace and permission
    const permission = await getPermissionByIds(user.id, workspaceId);

    if (!permission) {
      throw new AuthFailureError(
        "No user permissions found for this user workspace.",
      );
    }

    // Set locals to be used out of scope
    res.locals = { workspaceId, role: permission.role };
  }

  const { workspaceId, role } = res.locals;

  // Generates fresh workspace session token
  const workspaceToken = generateWorkspaceToken(
    user.id,
    user.email,
    workspaceId,
    role,
  );

  // Set response auth cookies and send data
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
    .cookie("sid", workspaceToken, {
      httpOnly: true,
      path: "/",
      maxAge: oneWeekMs, // expires cookie in 7d
    })
    .json({
      type: StatusType.SUCCESS,
      message: "User successfully logged in.",
      isAuthenticated: true,
    });
});

// Logic for user logout
export const logout = (_req: Request, res: Response) => {
  // Clear response auth cookies and send data
  return res
    .status(StatusCode.SUCCESS)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json({
      type: StatusType.SUCCESS,
      message: "User successfully logged out.",
      isAuthenticated: false,
    });
};
