// src/errors/errorHandlerMiddleware.ts
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ValidationError } from '../errors/ValidationError'
import { formatZodErrors } from '../utils/formatZodErrors'
type AppError = ValidationError | ZodError | Error
export const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message, errors: err.errors })
  }
  if (err instanceof ZodError) {
    const formattedErrors = formatZodErrors(err)
    return res
      .status(400)
      .json({ message: 'Validation Error', errors: formattedErrors })
  }
  return res.status(500).json({ message: 'Internal Server Error' })
}
