import { model, Schema, Types } from "mongoose";

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 100,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      select: false,
      required: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      select: false,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.index({ email: 1 });

export const UserModel = model<User>("User", userSchema);
