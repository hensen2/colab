import { Document, Types } from "mongoose";

export interface IProject {
  id?: string;
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  updatedAt?: Date;
  createdAt?: Date;
}

export type ProjectDoc = Document<unknown, {}, IProject> &
  IProject & {
    _id: Types.ObjectId;
  };
