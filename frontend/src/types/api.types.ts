export interface AuthResponse {
  type: string;
  message: string;
  accessToken: string | null;
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
