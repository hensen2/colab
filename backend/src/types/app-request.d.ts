import { Request } from "express";

declare interface PublicRequest extends Request {
  accessToken: string;
}
