import { model, Schema } from "mongoose";
import { IUser } from "./user.types";

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
    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
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
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.index({ _id: 1, workspaceId: 1 });
userSchema.index({ projects: 1 });

userSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, user) => {
    user.name = `${user.firstName} ${user.lastName}`;

    if (!user.avatarUrl) delete user.avatarUrl;

    delete user._id;
    delete user.firstName;
    delete user.lastName;
    delete user.passwordHash;
    delete user.workspaceId;
    delete user.updatedAt;
    delete user.createdAt;
    return user;
  },
});

export const User = model<IUser>("User", userSchema);
