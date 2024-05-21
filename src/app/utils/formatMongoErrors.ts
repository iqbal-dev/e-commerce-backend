// src/utils/mongoFormatter.ts
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';

export const formatMongoErrors = (err: mongoose.Error | MongoServerError) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return {
      statusCode: 400,
      message: 'Mongoose Validation Error',
      errors: err.errors,
    };
  }

  if (err instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      message: `Invalid ${err.path}: ${err.value}`,
    };
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return {
      statusCode: 404,
      message: 'Document Not Found',
    };
  }

  if (err instanceof MongoServerError) {
    // Handle duplicate key error
    if (err.code === 11000) {
      const duplicatedField = Object.keys(err.keyPattern)[0];
      return {
        statusCode: 409,
        message: `Duplicate key error: ${duplicatedField} already exists.`,
      };
    }
    return {
      statusCode: 500,
      message: 'MongoServerError',
      errors: err.message,
    };
  }

  return {
    statusCode: 500,
    message: 'Mongoose Error',
    errors: err.message,
  };
};
