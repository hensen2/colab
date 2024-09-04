export interface IBaseResponse {
  type: string;
  message: string;
}

export interface IAuthResponse extends IBaseResponse {
  accessToken: string;
  isAuthenticated: boolean;
}

export interface IWorkspace {
  id: string;
  name: string;
  initial: string;
}

export interface IUser {
  email: string;
  name: string;
  workspaces: IWorkspace[];
  avatarUrl?: string;
}

export interface IUserResponse extends IBaseResponse {
  user: IUser;
}

export interface ILoginUserData {
  email: string;
  password: string;
}

export interface IRegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IProtocol {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
}

export interface IProtocolsResponse {
  protocols: IProtocol[];
}

export interface ICreateProtocolData {
  name: string;
  description?: string;
}

export interface IExperiment {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
}

export interface IExperimentsResponse {
  experiments: IExperiment[];
}

export interface IExperimentResponse {
  experiment: IExperiment;
}

export interface ICreateExperimentData {
  name: string;
  description?: string;
  protocolId: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
  experiments: IExperiment[];
}

export interface IProjectsResponse {
  projects: IProject[];
}

export interface IProjectResponse {
  project: IProject;
}

export interface ICreateProjectData {
  name: string;
  description?: string;
}

export interface ICreateWorkspaceData {
  name: string;
  description?: string;
}

export interface IWorkspaceResponse {
  workspace: IWorkspace;
}
