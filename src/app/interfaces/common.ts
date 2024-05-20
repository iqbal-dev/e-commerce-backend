/**
 * Represents the return type for a service that includes metadata for pagination.
 * The generic type `T` is used to specify the type of the data.
 */
export type IServiceReturnType<T> = {
  meta: {
    page: number
    limit: number
    totalDoc: number
  }
  data: T
}

/**
 * Represents the response structure from an API.
 * The generic type `T` is used to specify the type of the data.
 * Includes status code, success flag, optional message, optional metadata for pagination, and optional data.
 */
export type IAPIResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    totalDoc: number
  }
  data?: T | null
}
