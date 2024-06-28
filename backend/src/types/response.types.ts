export enum StatusType {
  SUCCESS = "success",
  FAILURE = "failure",
  RETRY = "retry",
  INVALID_REFRESH_TOKEN = "unauthenticated",
  INVALID_ACCESS_TOKEN = "unauthorized",
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}
