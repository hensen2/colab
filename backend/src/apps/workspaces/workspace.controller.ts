import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { getWorkspaceById } from "./";
import { NotFoundError } from "../../lib/appError";
import { StatusCode, StatusType } from "../../types/response.types";

export const getWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspace = await getWorkspaceById(req.body.workspaceId);

  if (!workspace) {
    throw new NotFoundError("Workspace not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved workspace",
    workspace,
  });
});
