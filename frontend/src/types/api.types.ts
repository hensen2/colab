/* API entity interfaces */
export interface IWorkspace {
  id: string;
  name: string;
  initial: string;
}

export interface IUser {
  email: string;
  name: string;
  workspaces: IWorkspace[];
  initials: string;
  currentWorkspace: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
  experiments: IExperiment[];
}

export interface IProtocol {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
}

export interface IExperiment {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
}

/* API response interfaces */
export interface IBaseResponse {
  type: string;
  message: string;
}

export interface IAuthResponse extends IBaseResponse {
  isAuthenticated: boolean;
}

export interface IUserWorkspaceResponse extends IBaseResponse {
  user: IUser;
  colabToken: string;
}

export interface IWorkspaceResponse {
  workspace: IWorkspace;
}

export interface IProjectsResponse extends IBaseResponse {
  projects: IProject[];
}

export interface IProjectResponse extends IBaseResponse {
  project: IProject;
}

export interface IProtocolsResponse extends IBaseResponse {
  protocols: IProtocol[];
}

export interface IExperimentsResponse extends IBaseResponse {
  experiments: IExperiment[];
}

export interface IExperimentResponse extends IBaseResponse {
  experiment: IExperiment;
}

/* API mutation payload interfaces */
export interface ILoginUserData {
  email: string;
  password: string;
}

export interface IRegisterUserData extends ILoginUserData {
  firstName: string;
  lastName: string;
}

export interface ICreateWorkspaceData {
  name: string;
  description?: string;
}

export interface ICreateProjectData {
  name: string;
  description?: string;
}

export interface ICreateProtocolData {
  name: string;
  description?: string;
}

export interface ICreateExperimentData {
  name: string;
  description?: string;
  protocolId: string;
}
