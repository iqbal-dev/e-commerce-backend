// src/errors/errorHandlerMiddleware.ts
import { NextFunction, Request, Response } from 'express'
import { MongoServerError } from 'mongodb'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { ValidationError } from '../errors/ValidationError'
import { formatMongoErrors } from '../utils/formatMongoErrors'
import { formatZodErrors } from '../utils/formatZodErrors'

type AppError =
  | ValidationError
  | ZodError
  | mongoose.Error
  | MongoServerError
  | Error

export const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.message,
      errors: err.errors,
    })
  }

  if (err instanceof ZodError) {
    const formattedErrors = formatZodErrors(err)
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Validation Error',
      errors: formattedErrors,
    })
  }

  if (err instanceof mongoose.Error || err instanceof MongoServerError) {
    const formattedError = formatMongoErrors(err)
    return res.status(formattedError.statusCode).json({
      success: false,
      statusCode: formattedError.statusCode,
      message: formattedError.message,
      errors: formattedError.errors,
    })
  }

  console.error('Unexpected error:', err) // Log the error for debugging

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
  })
}
