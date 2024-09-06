import { Request, NextFunction, Response } from "express";
import { verifyWorkspaceToken } from "../lib/tokens";
import { AuthFailureError, WorkspaceTokenError } from "../lib/appError";
import catchAsync from "../utils/catchAsync";
import { getPermissionByIds } from "../apps/permissions";

/** Middleware function authorizes users and sets permissions for all protected API requests. */
const authorize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId, email, currentWorkspace } = res.locals.user;

    // Verify workspace token with subject claim from auth middleware
    const payload = verifyWorkspaceToken(req.cookies.sid, email);

    if (!payload || currentWorkspace.toString() !== payload.workspaceId) {
      throw new WorkspaceTokenError();
    }

    // Fetches user permissions
    const permission = await getPermissionByIds(userId, payload.workspaceId);

    if (!permission || permission.colabToken !== payload.colabToken) {
      throw new AuthFailureError(
        "No user permissions found for this user workspace.",
      );
    }

    // Sets user permissions data for current request
    res.locals.workspaceId = payload.workspaceId;
    res.locals.colabToken = payload.colabToken;
    res.locals.role = permission.role;

    next();
  },
);

export default authorize;
