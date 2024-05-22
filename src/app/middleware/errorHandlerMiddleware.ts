// src/errors/errorHandlerMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { NotFoundError } from '../errors/NotFoundError';
import { ValidationError } from '../errors/ValidationError';
import { formatMongoErrors } from '../utils/formatMongoErrors';
import { formatZodErrors } from '../utils/formatZodErrors';

type AppError =
  | ValidationError
  | ZodError
  | mongoose.Error
  | MongoServerError
  | Error;

export const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof ZodError) {
    const formattedErrors = formatZodErrors(err);
    return res.status(formattedErrors.statusCode).json({
      success: false,
      statusCode: formattedErrors.statusCode,
      message: 'Validation Error',
      errors: formattedErrors.errors,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof mongoose.Error || err instanceof MongoServerError) {
    const formattedError = formatMongoErrors(err);
    return res.status(formattedError.statusCode).json({
      success: false,
      statusCode: formattedError.statusCode,
      message: formattedError.message,
      errors: formattedError.errors,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
  });
};
