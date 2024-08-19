import { Document, Types } from "mongoose";

export interface IExperiment {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  projectId?: Types.ObjectId;
  protocolState: Buffer;
  notesState: Buffer;
}

export type ExperimentDoc = Document<unknown, {}, IExperiment> &
  IExperiment & {
    _id: Types.ObjectId;
  };
