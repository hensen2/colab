import { model, Schema } from "mongoose";
import { IUser } from "./";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      minlength: 7,
      maxlength: 63,
      trim: true,
      lowercase: true,
      required: true,
    },
    firstName: {
      type: String,
      minlength: 1,
      maxlength: 63,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 63,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    workspaces: [
      { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.index({ email: 1 });
userSchema.index({ _id: 1, workspaces: 1 });

userSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, user) => {
    user.name = `${user.firstName} ${user.lastName}`;

    if (!user.avatarUrl) {
      delete user.avatarUrl;
      user.initials = `${user.firstName[0]}${user.lastName[0]}`;
    }

    delete user._id;
    delete user.firstName;
    delete user.lastName;
    delete user.passwordHash;
    delete user.updatedAt;
    delete user.createdAt;
    return user;
  },
});

export const User = model<IUser>("User", userSchema);
