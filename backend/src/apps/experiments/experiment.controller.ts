import { Request, Response } from "express";
import { createNewExperiment, getWorkspaceExperiments } from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";

export const getExperiments = catchAsync(
  async (_req: Request, res: Response) => {
    const experiments = await getWorkspaceExperiments(res.locals.workspaceId);

    if (!experiments) {
      throw new NotFoundError("Experiments not found");
    }

    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "Retrieved all experiments",
      experiments,
    });
  },
);

export const createExperiment = catchAsync(
  async (req: Request, res: Response) => {
    const { user, workspaceId } = res.locals;
    const experiment = await createNewExperiment({
      ...req.body,
      workspaceId,
      createdBy: user.email,
    });

    if (!experiment) {
      throw new NotFoundError("Experiment not created");
    }

    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "New experiment created",
      experiment,
    });
  },
);
