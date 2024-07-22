import { Document, Types } from "mongoose";

export interface IProject {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
}

export type ProjectDoc = Document<unknown, {}, IProject> &
  IProject & {
    _id: Types.ObjectId;
  };
