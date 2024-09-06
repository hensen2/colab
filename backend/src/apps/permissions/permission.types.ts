import { Document, Types } from "mongoose";

export interface IPermission {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: "admin" | "user";
  colabToken: string;
}

export type PermissionDoc = Document<unknown, {}, IPermission> &
  IPermission & {
    _id: Types.ObjectId;
  };
