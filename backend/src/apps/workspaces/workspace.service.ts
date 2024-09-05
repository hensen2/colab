import { ClientSession } from "mongoose";
import { Workspace, IWorkspace } from "./";

/** Find workspace by primary id. */
export const getWorkspaceById = async (id: string) => {
  return await Workspace.findById(id);
};

/** Creates a new workspace within an active transaction session. */
export const createWorkspace = async (
  data: IWorkspace,
  { session }: { session: ClientSession },
) => {
  return await Workspace.create([data], { session });
};
