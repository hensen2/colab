import { Document, Types } from "mongoose";

export interface IExperiment {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  projectId?: Types.ObjectId;
  protocolDocument: Types.ObjectId;
  notesDocument: Types.ObjectId;
}

export type ExperimentDoc = Document<unknown, {}, IExperiment> &
  IExperiment & {
    _id: Types.ObjectId;
  };
