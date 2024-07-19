import { model, Schema } from "mongoose";
import { IProject } from "./project.types";

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 63,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 255,
      trim: true,
    },
    createdBy: {
      type: String,
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
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

projectSchema.index({ workspaceId: 1 });

projectSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, project) => {
    project.id = project._id;
    delete project._id;
    delete project.createdBy;
    delete project.updatedAt;
    delete project.createdAt;
    return project;
  },
});

export const Project = model<IProject>("Project", projectSchema);
