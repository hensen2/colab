import { Document, Types } from "mongoose";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatarUrl?: string;
  workspaces: Types.ObjectId[];
}

export type UserDoc = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };
