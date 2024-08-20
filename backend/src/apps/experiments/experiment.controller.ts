import { Request, Response } from "express";
import {
  createNewExperiment,
  getExperimentWithIds,
  getWorkspaceExperiments,
} from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";
import { getProtocolWithIds } from "../protocols";
import { Types } from "mongoose";
import { createInitialYDoc, createNewDocument } from "../documents";

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
    const { protocolId, name, description } = req.body;

    const protocol = await getProtocolWithIds(protocolId, workspaceId);

    if (!protocol || !protocol.document.state) {
      throw new NotFoundError("Protocol not found");
    }

    const experiment = await createNewExperiment({
      name,
      description,
      createdBy: user.email,
      workspaceId,
      protocolDocument: new Types.ObjectId(),
      notesDocument: new Types.ObjectId(),
    });

    if (!experiment) {
      throw new NotFoundError("Experiment not created");
    }

    const newDocsData = [
      {
        _id: experiment.protocolDocument,
        name: `experiment.protocol.${experiment.id}`,
        createdBy: user.email,
        workspaceId,
        state: protocol.document.state,
      },
      {
        _id: experiment.notesDocument,
        name: `experiment.notes.${experiment.id}`,
        createdBy: user.email,
        workspaceId,
        state: createInitialYDoc(),
      },
    ];

    const document = await createNewDocument(newDocsData);

    if (!document) {
      throw new NotFoundError("Document not created");
    }

    return res.status(StatusCode.SUCCESS).json({
      type: StatusType.SUCCESS,
      message: "New experiment created",
      experiment,
    });
  },
);

export const getExperiment = catchAsync(async (req: Request, res: Response) => {
  const experiment = await getExperimentWithIds(
    req.params.experimentId,
    res.locals.workspaceId,
  );

  if (!experiment) {
    throw new NotFoundError("Experiment not found");
  }

  return res.status(StatusCode.SUCCESS).json({
    type: StatusType.SUCCESS,
    message: "Retrieved experiment",
    experiment,
  });
});
