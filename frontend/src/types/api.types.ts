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

// export interface IWorkspace {

// }

export interface AuthResponse {
  type: string;
  message: string;
  accessToken: string | null;
  workspaceId: string | null;
  user: {
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  email: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
  experiments: IExperiment[];
}

export interface IProjectResponse {
  project: IProject;
}

export interface ICreateProject {
  name: string;
  description?: string;
}

export interface IProjectsResponse {
  projects: IProject[];
}

export interface IExperiment {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
}

export interface ICreateExperiment {
  name: string;
  description?: string;
}

export interface IExperimentsResponse {
  experiments: IExperiment[];
}
