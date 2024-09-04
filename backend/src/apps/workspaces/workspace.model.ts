import { model, Schema } from "mongoose";
import { IWorkspace } from "./";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 63,
      trim: true,
      required: true,
    },
    createdBy: {
      type: String,
      minlength: 7,
      maxlength: 63,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

workspaceSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, workspace) => {
    workspace.id = workspace._id;
    workspace.initial = workspace.name[0];

    delete workspace._id;
    delete workspace.createdBy;
    delete workspace.updatedAt;
    delete workspace.createdAt;
    return workspace;
  },
});

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);
