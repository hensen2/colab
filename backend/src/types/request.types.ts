import { Request } from "express";
import User from "../apps/users/user.model";

export interface PublicRequest extends Request {
  accessToken?: string;
}

export interface ProtectedRequest extends PublicRequest {
  user?: User;
}
