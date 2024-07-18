import { Document, Types } from "mongoose";

export interface IWorkspace {
  id?: string;
  name: string;
  createdBy: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export type WorkspaceDoc = Document<unknown, {}, IWorkspace> &
  IWorkspace & {
    _id: Types.ObjectId;
  };
