import { Project } from "./project.model";

export const getProjectsByWorkspaceId = async (workspaceId: string) => {
  return await Project.find({ workspace: workspaceId });
};
