import { Response } from "express";
import { StatusType, StatusCode } from "../types/response.types";

export class AppResponse extends Response {
  constructor(
    protected statusType: StatusType,
    protected statusCode: StatusCode,
    protected message: string,
  ) {
    super();

    this.statusType = statusType;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class TokenResponse extends AppResponse {
  constructor(
    private res: Response,
    private accessToken: string,
  ) {
    super(StatusType.SUCCESS, StatusCode.SUCCESS, "authenticated");

    this.res = res;
    this.accessToken = accessToken;
  }

  public send(): Response {
    return this.res.status(this.statusCode).send({
      type: this.statusType,
      message: this.message,
      accessToken: this.accessToken,
    });
  }
  //   send(res: Response, accessToken: string): Response {
  //     return super.send(res, accessToken);
  //   }
}
