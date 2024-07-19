import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { getProjectsByWorkspaceId } from "./project.service";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";

export const getProjects = catchAsync(async (_req: Request, res: Response) => {
  const projects = await getProjectsByWorkspaceId(res.locals.workspaceId);

  if (!projects) {
    throw new NotFoundError("Projects not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved all projects",
    projects,
  });
});
