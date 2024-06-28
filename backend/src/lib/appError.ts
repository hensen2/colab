export class AppError extends Error {
  public readonly type: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    type: string,
    statusCode: number,
    message: string,
    isOperational: boolean = true,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
