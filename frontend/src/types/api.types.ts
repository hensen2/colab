export interface IBaseResponse {
  type: string;
  message: string;
}

export interface IAuthResponse extends IBaseResponse {
  accessToken: string;
  isAuthenticated: boolean;
}

export interface IUser {
  email: string;
  name: string;
  role: "admin" | "user";
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

export interface ICreateExperimentData {
  name: string;
  description?: string;
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
