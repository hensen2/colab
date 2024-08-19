import { Document, Types } from "mongoose";

export interface IProtocol {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  projectId?: Types.ObjectId;
  state: Buffer;
}

export type ProtocolDoc = Document<unknown, {}, IProtocol> &
  IProtocol & {
    _id: Types.ObjectId;
  };
