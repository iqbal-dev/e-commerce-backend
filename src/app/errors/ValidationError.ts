export class ValidationError extends Error {
  errors: Record<string, string>
  constructor(errors: Record<string, string>) {
    super('Validation Error')
    this.errors = errors
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
