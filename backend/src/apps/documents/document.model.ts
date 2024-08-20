import { model, Schema } from "mongoose";
import { IDocument } from "./";

const documentSchema = new Schema<IDocument>(
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
    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
    },
    parentDocId: {
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

documentSchema.index({ workspaceId: 1 });
documentSchema.index({ workspaceId: 1, name: 1 });

documentSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, document) => {
    document.id = document._id;
    delete document._id;
    delete document.workspaceId;
    delete document.createdAt;
    return document;
  },
});

export const Document = model<IDocument>("Document", documentSchema);
