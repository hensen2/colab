import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createWorkspace, getWorkspaceById } from "./";
import { BadRequestError, NotFoundError } from "../../lib/appError";
import { StatusCode, StatusType } from "../../types/response.types";
import { runTransaction } from "../../db/runTransaction";
import { createPermission } from "../permissions";
import { addNewUserWorkspace } from "../users";
import { generateAuthTokens, generateWorkspaceToken } from "../../lib/tokens";
import { expireTimes } from "../../lib/config";

// Extract expiration constants
const { oneHourMs, oneDayMs, oneWeekMs } = expireTimes;

/** Route controller that handles fetching workspace session data. */
export const getWorkspaceSession = catchAsync(
  async (_req: Request, res: Response) => {
    // Extract session data for current request
    const { user, workspaceId, role } = res.locals;

    // Find workspace for current client session
    const workspace = await getWorkspaceById(workspaceId);

    if (!workspace) {
      throw new NotFoundError("Workspace session not found.");
    }

    // Generates fresh workspace session token
    const workspaceToken = generateWorkspaceToken(
      user.id,
      user.email,
      workspaceId,
      role,
    );

    // Set response workspace session cookie and send data
    return res
      .status(StatusCode.SUCCESS)
      .cookie("sid", workspaceToken, {
        httpOnly: true,
        path: "/",
        maxAge: oneWeekMs, // expires cookie in 7d
      })
      .json({
        type: StatusType.SUCCESS,
        message: "Retrieved workspace session.",
        workspace,
      });
  },
);

export const createNewWorkspace = catchAsync(
  async (req: Request, res: Response) => {
    const { email, id: userId } = res.locals.user;

    // Run transaction to ensure all data is created or not at all
    await runTransaction(async (session) => {
      // Create new workspace
      const [workspace] = await createWorkspace(
        {
          name: req.body.name,
          createdBy: email,
        },
        { session },
      );

      if (!workspace) {
        throw new BadRequestError("Bad request: Unable to setup new workspace");
      }

      res.locals.workspaceId = workspace.id;

      // Create new user permission
      const [permission] = await createPermission(
        {
          workspaceId: workspace.id,
          userId,
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

      // Update user workspaces
      const user = await addNewUserWorkspace(userId, workspace.id);

      if (!user) {
        throw new BadRequestError(
          "Bad request: Unable to update user workspaces",
        );
      }
    });

    // const { workspaceId, role } = res.locals;

    const { accessToken, refreshToken } = generateAuthTokens(userId, email);

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
        message: "Created new workspace",
      });
  },
);
