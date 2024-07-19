import { Document, Types } from "mongoose";

export interface IUser {
  id?: string;
  email: string;
  workspace: Types.ObjectId;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatarUrl?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export type UserDoc = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };
