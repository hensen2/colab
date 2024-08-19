import { Request, Response } from "express";
import {
  createNewExperiment,
  getExperimentWithIds,
  getWorkspaceExperiments,
} from "./";
import catchAsync from "../../utils/catchAsync";
import { StatusCode, StatusType } from "../../types/response.types";
import { NotFoundError } from "../../lib/appError";
import { Doc, encodeStateAsUpdate } from "yjs";
import { getProtocolWithIds } from "../protocols";

function createInitialExperimentDoc() {
  const ydoc = new Doc();
  return Buffer.from(encodeStateAsUpdate(ydoc));
}

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

    if (!protocol) {
      throw new NotFoundError("Protocol not found");
    }

    const notesState = createInitialExperimentDoc();

    const experiment = await createNewExperiment({
      name,
      description,
      workspaceId,
      createdBy: user.email,
      protocolState: protocol.state,
      notesState,
    });

    if (!experiment) {
      throw new NotFoundError("Experiment not created");
    }

    console.log(experiment);
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
