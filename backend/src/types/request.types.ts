import { Request } from "express";
import { UserDoc } from "../apps/users";
import { WorkspaceDoc } from "../apps/workspaces";

export enum RequestSource {
  BODY = "body",
  HEADER = "headers",
  COOKIE = "cookies",
  QUERY = "query",
  PARAM = "params",
}
export interface AuthRequest extends Request {
  accessToken?: string;
  user?: UserDoc;
  workspace?: WorkspaceDoc;
}
