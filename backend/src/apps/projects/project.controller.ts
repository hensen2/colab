import { Request, Response } from "express";
import { createNewProject, getWorkspaceProjects } from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";

export const getProjects = catchAsync(async (_req: Request, res: Response) => {
  const projects = await getWorkspaceProjects(res.locals.workspaceId);

  if (!projects) {
    throw new NotFoundError("Projects not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved all projects",
    projects,
  });
});

export const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await createNewProject(req.body);

  if (!project) {
    throw new NotFoundError("Projects not created");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "New project created",
    project,
  });
});
