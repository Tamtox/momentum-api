import { EMAIL_MAX, EMAIL_MIN, PASS_MAX, PASS_MIN } from 'src/common/constants/constants';
import { zodCreateStringValidator } from 'src/common/validation/zod/validatiorFunctions';
import { z } from 'zod';

// #region Sign Up
export const signUpValidationSchema = z.object(
  {
    email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
    password: z.string().min(PASS_MIN).max(PASS_MAX),
  },
  {
    invalid_type_error: 'Sign up data must be an object',
    required_error: 'Sign up data is required',
  },
);

export type SignUpDto = z.infer<typeof signUpValidationSchema>;
// #endregion

// #region Sign In
export const signInValidationSchema = z.object(
  {
    email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
    password: z.string().min(PASS_MIN).max(PASS_MAX),
  },
  {
    invalid_type_error: 'Sign in data must be an object',
    required_error: 'Sign in data is required',
  },
);
export type SignInDto = z.infer<typeof signInValidationSchema>;
// #endregion
