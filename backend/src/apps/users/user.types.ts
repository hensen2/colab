import { Document, Types } from "mongoose";

export interface IUser {
  email: string;
  workspaceId: Types.ObjectId;
  role: "admin" | "user";
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatarUrl?: string;
}

export type UserDoc = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };
