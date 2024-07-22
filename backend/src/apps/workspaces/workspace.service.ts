import { ClientSession } from "mongoose";
import { Workspace, IWorkspace } from "./";

export const getWorkspaceById = async (id: string) => {
  return await Workspace.findById(id);
};

export const createWorkspace = async (
  data: IWorkspace,
  { session }: { session: ClientSession },
) => {
  return await Workspace.create([data], { session });
};
