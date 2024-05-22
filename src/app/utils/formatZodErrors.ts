import { ZodError, ZodIssue } from 'zod';

export const formatZodErrors = (
  zodError: ZodError,
): { statusCode: number; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  zodError.errors.forEach((issue: ZodIssue) => {
    if (issue.path.length > 0) {
      errors[issue.path.join('.')] = issue.message;
    }
  });
  return { statusCode: 400, errors };
};
