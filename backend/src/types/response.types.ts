export enum StatusType {
  SUCCESS = "Success",
  FAILURE = "Failure",
  RETRY = "Retry",
  INVALID_REFRESH_TOKEN = "Unauthenticated",
  INVALID_ACCESS_TOKEN = "Unauthorized",
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export enum ErrorType {
  BAD_TOKEN = "BadTokenError",
  TOKEN_EXPIRED = "TokenExpiredError",
  UNAUTHENTICATED = "AuthFailureError",
  ACCESS_TOKEN = "AccessTokenError",
  REFRESH_TOKEN = "AccessTokenError",
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  NO_ENTRY = "NoEntryError",
  NO_DATA = "NoDataError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
}
