import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { generateWorkspaceToken } from "../../lib/tokens";
import { expireTimes } from "../../lib/config";
import { getPermissionByIds } from "../permissions";
import { NotFoundError } from "../../lib/appError";

// Extract expiration constants
const { oneWeekMs } = expireTimes;

/** Route controller that handles fetching user session data */
export const getUserSession = catchAsync(
  async (_req: Request, res: Response) => {
    // Extract session data for current request
    const { user, workspaceId, colabToken } = res.locals;

    // Generates fresh workspace session token
    const workspaceToken = generateWorkspaceToken(
      user.id,
      user.email,
      workspaceId,
      colabToken,
    );

    // Set response session cookie and send data
    return res
      .status(StatusCode.SUCCESS)
      .cookie("sid", workspaceToken, {
        httpOnly: true,
        path: "/",
        maxAge: oneWeekMs, // expires cookie in 7d
      })
      .json({
        type: StatusType.SUCCESS,
        message: "Retrieved user session data.",
        user,
        colabToken,
      });
  },
);

/** Route controller that handles changing user workspace session */
export const changeUserWorkspace = catchAsync(
  async (req: Request, res: Response) => {
    // Extract session data for current request
    const { user } = res.locals;
    const { workspaceId } = req.body;

    // Fetches user permissions to update workspace token
    const permission = await getPermissionByIds(user.id, workspaceId);

    if (!permission) {
      throw new NotFoundError(
        "No user permissions found for this user workspace.",
      );
    }

    // Update and save user data
    user.currentWorkspace = workspaceId;
    await user.save();

    // Generates fresh workspace session token
    const workspaceToken = generateWorkspaceToken(
      user.id,
      user.email,
      workspaceId,
      permission.colabToken,
    );

    // Set response session cookie and send data
    return res
      .status(StatusCode.SUCCESS)
      .cookie("sid", workspaceToken, {
        httpOnly: true,
        path: "/",
        maxAge: oneWeekMs, // expires cookie in 7d
      })
      .json({
        type: StatusType.SUCCESS,
        message: "Changed to new user workspace.",
        user,
      });
  },
);
