export enum StatusType {
  SUCCESS = "Success",
  FAILURE = "Failure",
  RETRY = "Retry",
  UNAUTHENTICATED = "Unauthenticated",
  INVALID_ACCESS_TOKEN = "Unauthorized",
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL = 500,
}

export enum ErrorType {
  BAD_TOKENS = "BadTokensError",
  TOKEN_EXPIRED = "TokenExpiredError",
  UNAUTHENTICATED = "AuthFailureError",
  ACCESS_TOKEN = "AccessTokenError",
  REFRESH_TOKEN = "RefreshTokenError",
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
  CONFLICT = "ConflictError",
  BAD_AUTH_REQUEST = "BadAuthRequestError",
}
