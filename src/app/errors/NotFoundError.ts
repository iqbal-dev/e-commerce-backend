export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statusCode;
  }
}
