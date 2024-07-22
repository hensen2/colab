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
  name: string;
  description: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICreateProject {
  name: string;
  description?: string;
}

export interface IProjectsResponse {
  projects: IProject[];
}
