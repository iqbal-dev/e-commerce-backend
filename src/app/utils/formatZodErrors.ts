// src/utils/formatZodErrors.ts
import { ZodError, ZodIssue } from 'zod'

export const formatZodErrors = (zodError: ZodError): Record<string, string> => {
  const errors: Record<string, string> = {}
  zodError.errors.forEach((issue: ZodIssue) => {
    if (issue.path.length > 0) {
      errors[issue.path.join('.')] = issue.message
    }
  })
  return errors
}
