import { Document, Types } from "mongoose";

export interface IDocument {
  name: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  projectId?: Types.ObjectId;
  parentDocId?: Types.ObjectId;
  state: Buffer;
}

export type DocumentDoc = Document<unknown, {}, IDocument> &
  IDocument & {
    _id: Types.ObjectId;
  };
