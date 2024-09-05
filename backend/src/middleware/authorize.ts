import { Request, NextFunction, Response } from "express";
import { verifyWorkspaceToken } from "../lib/tokens";
import { AuthFailureError } from "../lib/appError";
import catchAsync from "../utils/catchAsync";
import { getPermissionByIds } from "../apps/permissions";

/** Middleware function authorizes users and sets permissions for all protected API requests. */
const authorize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { workspaceId } = verifyWorkspaceToken(req.cookies.sid);

    const permission = await getPermissionByIds(
      res.locals.user.id,
      workspaceId,
    );

    if (!permission) {
      throw new AuthFailureError(
        "No user permissions found for this user workspace.",
      );
    }

    // Sets user permissions data for current request
    res.locals.workspaceId = workspaceId;
    res.locals.role = permission.role;

    next();
  },
);

export default authorize;
