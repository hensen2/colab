import { model, Schema } from "mongoose";
import { IPermission } from "./";

const permissionSchema = new Schema<IPermission>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

permissionSchema.index({ userId: 1, workspaceId: 1 });

permissionSchema.set("toJSON", {
  flattenObjectIds: true,
  transform: (_doc, permission) => {
    permission.id = permission._id;

    delete permission._id;
    delete permission.updatedAt;
    delete permission.createdAt;
    return permission;
  },
});

export const Permission = model<IPermission>("Permission", permissionSchema);
