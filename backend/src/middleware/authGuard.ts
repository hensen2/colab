import { Request, NextFunction, Response } from "express";
import { StatusCode, StatusType } from "../types/response.types";

/** Checks if auth status of client is unauthenticated or stale. If so, returns unauthenticated user session data back to client. */
const authGuard = (req: Request, res: Response, next: NextFunction) => {
  // Handle unauthenticated or stale sessions
  if (!req.cookies.refreshToken) {
    // Send unauthenticated user session
    return res.status(StatusCode.SUCCESS).clearCookie("accessToken").json({
      type: StatusType.UNAUTHENTICATED,
      message: "User credentials required.",
      isAuthenticated: false,
    });
  }

  next();
};

export default authGuard;
