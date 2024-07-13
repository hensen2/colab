import { model, Schema, Types } from "mongoose";

export default interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>(
  {
    firstName: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.index({ email: 1 });

export const UserModel = model<User>("User", userSchema);
