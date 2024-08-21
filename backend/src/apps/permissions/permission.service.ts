import { ClientSession } from "mongoose";
import { Permission, IPermission } from "./";

export const getPermissionWithIds = async (
  userId: string,
  workspaceId: string,
) => {
  return await Permission.findOne({ userId, workspaceId });
};

export const createPermission = async (
  data: IPermission,
  { session }: { session: ClientSession },
) => {
  return await Permission.create([data], { session });
};
