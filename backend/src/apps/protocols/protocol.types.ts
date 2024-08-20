import { Document, Types } from "mongoose";

export interface IProtocol {
  name: string;
  description?: string;
  createdBy: string;
  workspaceId: Types.ObjectId;
  isProjectMember: boolean;
  projectId?: Types.ObjectId;
  document: Types.ObjectId;
}

export type ProtocolDoc = Document<unknown, {}, IProtocol> &
  IProtocol & {
    _id: Types.ObjectId;
  };
