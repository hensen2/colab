import { Document, Types } from "mongoose";

export interface IExperiment {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  projectId?: Types.ObjectId;
}

export type ExperimentDox = Document<unknown, {}, IExperiment> &
  IExperiment & {
    _id: Types.ObjectId;
  };
