import { model, Schema } from "mongoose";
import { IExperiment } from "./";

const experimentSchema = new Schema<IExperiment>(
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
      // minlength: 0 || 3,
      maxlength: 255,
      trim: true,
      default: "",
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
    projectId: {
      type: Schema.Types.ObjectId,
    },
    state: {
      type: Schema.Types.Buffer,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

experimentSchema.index({ workspaceId: 1 });
experimentSchema.index({ _id: 1, workspaceId: 1 });

experimentSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, experiment) => {
    experiment.id = experiment._id;
    delete experiment._id;
    delete experiment.workspaceId;
    delete experiment.createdAt;
    return experiment;
  },
});

export const Experiment = model<IExperiment>("Experiment", experimentSchema);
