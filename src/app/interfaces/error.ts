/**
 * Represents a generic error message with a path and a message.
 * The path can be either a string or a number, indicating the location or key related to the error.
 */
export type TGenericErrorMessage = {
  path: string | number
  message: string
}

/**
 * Represents a generic error response.
 * Contains a status code, a general message, and an array of detailed error messages.
 */
export type TGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: TGenericErrorMessage[]
}
