import { Response } from "express";
import { StatusType, StatusCode } from "../types/response.types";

export class AppResponse extends Response {
  constructor(
    protected statusType: StatusType,
    protected statusCode: StatusCode,
  ) {
    super();

    this.statusType = statusType;
    this.statusCode = statusCode;
  }
}

export class AuthSuccessResponse extends AppResponse {
  constructor(
    private res: Response,
    private accessToken: string | null,
    private user: { email: string; name: string } | null,
    private message: string = "authenticated",
  ) {
    super(StatusType.SUCCESS, StatusCode.SUCCESS);

    this.res = res;
    this.accessToken = accessToken;
    this.user = user;
    this.message = message;
  }

  public send(): Response {
    return this.res.status(this.statusCode).send({
      type: this.statusType,
      message: this.message,
      accessToken: this.accessToken,
      user: this.user,
    });
  }
}
