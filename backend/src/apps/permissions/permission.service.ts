import { ClientSession } from "mongoose";
import { Permission, IPermission } from "./";

/** Find unique permission with indexed userId and workspaceId. */
export const getPermissionByIds = async (
  userId: string,
  workspaceId: string,
) => {
  return await Permission.findOne({ userId, workspaceId });
};

/** Creates a new user permission role within an active transaction session. */
export const createPermission = async (
  data: IPermission,
  { session }: { session: ClientSession },
) => {
  return await Permission.create([data], { session });
};
