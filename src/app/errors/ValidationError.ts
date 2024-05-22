export class ValidationError extends Error {
  errors: Record<string, string>;
  statusCode: number;

  constructor(errors: Record<string, string>, statusCode: number = 400) {
    super('Validation Error');
    this.errors = errors;
    this.statusCode = statusCode;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
