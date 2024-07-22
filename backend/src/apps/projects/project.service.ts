import { Project, IProject } from "./";

export const createNewProject = async (data: IProject) => {
  return await Project.create(data);
};

export const getWorkspaceProjects = async (workspaceId: string) => {
  return await Project.find({ workspaceId });
};

export const getProjectWithIds = async (_id: string, workspaceId: string) => {
  return await Project.findOne({ _id, workspaceId });
};
