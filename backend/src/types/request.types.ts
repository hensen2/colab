import { Request } from "express";
import User from "../apps/users/user.model";

export enum RequestSource {
  BODY = "body",
  HEADER = "headers",
  COOKIE = "cookies",
  QUERY = "query",
  PARAM = "params",
}
export interface PublicRequest extends Request {
  accessToken?: string;
}

export interface ProtectedRequest extends PublicRequest {
  user?: User;
}
