export class ValidationError extends Error {
  errors?: Record<string, string>;
  statusCode: number;

  constructor(
    errors: Record<string, string>,
    statusCode: number = 400,
    message: string = 'Validation Error',
  ) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
