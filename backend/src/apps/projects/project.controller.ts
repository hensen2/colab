import { Request, Response } from "express";
import { createNewProject, getProjectWithIds, getWorkspaceProjects } from "./";
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
  const { user, workspaceId } = res.locals;
  const project = await createNewProject({
    ...req.body,
    workspaceId,
    createdBy: user.email,
  });

  if (!project) {
    throw new NotFoundError("Projects not created");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "New project created",
    project,
  });
});

export const getProject = catchAsync(async (req: Request, res: Response) => {
  const project = await getProjectWithIds(
    req.params.projectId,
    res.locals.workspaceId,
  );

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved project",
    project,
  });
});
