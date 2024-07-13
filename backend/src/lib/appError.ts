import { ErrorType } from "../types/response.types";

export class AppError extends Error {
  constructor(
    public errorType: ErrorType,
    public message: string = "error",
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = errorType;

    Error.captureStackTrace(this);
  }
}

export class AuthFailureError extends AppError {
  constructor(message = "Invalid credentials") {
    super(ErrorType.UNAUTHENTICATED, message);
  }
}

export class BadTokenError extends AppError {
  constructor(message = "Invalid token") {
    super(ErrorType.BAD_TOKEN, message);
  }
}

export class AccessTokenError extends AppError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}

export class RefreshTokenError extends AppError {
  constructor(message = "Invalid refresh token") {
    super(ErrorType.REFRESH_TOKEN, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}
