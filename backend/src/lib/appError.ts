import { ErrorType, StatusCode } from "../types/response.types";

export class AppError extends Error {
  constructor(
    public readonly errorType: ErrorType,
    public readonly statusCode: StatusCode,
    public readonly message: string = "App error",
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = errorType;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(ErrorType.BAD_REQUEST, StatusCode.BAD_REQUEST, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource conflict occurred") {
    super(ErrorType.CONFLICT, StatusCode.CONFLICT, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(ErrorType.NOT_FOUND, StatusCode.NOT_FOUND, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Resource access forbidden") {
    super(ErrorType.FORBIDDEN, StatusCode.FORBIDDEN, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadTokensError extends AppError {
  constructor(message = "Invalid token") {
    super(ErrorType.BAD_TOKENS, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class TokenExpiredError extends AppError {
  constructor(message = "Token expired") {
    super(ErrorType.TOKEN_EXPIRED, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class AccessTokenError extends AppError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class RefreshTokenError extends AppError {
  constructor(message = "Invalid refresh token") {
    super(ErrorType.REFRESH_TOKEN, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class WorkspaceTokenError extends AppError {
  constructor(message = "Invalid workspace token") {
    super(ErrorType.BAD_TOKENS, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class AuthFailureError extends AppError {
  constructor(message = "Invalid auth credentials") {
    super(ErrorType.UNAUTHENTICATED, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadAuthRequestError extends AppError {
  constructor(message = "No refresh token found") {
    super(ErrorType.BAD_AUTH_REQUEST, StatusCode.UNAUTHENTICATED, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class InternalError extends AppError {
  constructor(message = "Internal server error") {
    super(ErrorType.INTERNAL, StatusCode.INTERNAL, message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
