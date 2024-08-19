import { model, Schema } from "mongoose";
import { IProtocol } from "./";

const protocolSchema = new Schema<IProtocol>(
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
      type: Buffer,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

protocolSchema.index({ workspaceId: 1 });
protocolSchema.index({ _id: 1, workspaceId: 1 });

protocolSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, protocol) => {
    protocol.id = protocol._id;
    delete protocol._id;
    delete protocol.workspaceId;
    delete protocol.createdAt;
    return protocol;
  },
});

export const Protocol = model<IProtocol>("Protocol", protocolSchema);
