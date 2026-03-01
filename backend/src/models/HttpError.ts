export class HttpError extends Error {
  public readonly errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.name = 'HttpError';
    this.errorCode = errorCode;
  }
}