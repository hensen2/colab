import { Document, Types } from "mongoose";

export interface IWorkspace {
  name: string;
  createdBy: string;
}

export type WorkspaceDoc = Document<unknown, {}, IWorkspace> &
  IWorkspace & {
    _id: Types.ObjectId;
  };
