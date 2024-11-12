import { z } from 'zod';

export const zodCustomErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === z.ZodIssueCode.invalid_type) {
    return { message: 'Invalid type!' };
  }
  // fall back to default message!
  return { message: ctx.defaultError };
};
