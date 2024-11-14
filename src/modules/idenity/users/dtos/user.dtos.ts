import { EMAIL_MAX, EMAIL_MIN, PASS_MAX, PASS_MIN, STRING_MAX, STRING_MIN } from 'src/common/constants/constants';
import { zodCreateStringValidator } from 'src/common/validation/zod/validatiorFunctions';
import { z } from 'zod';

// #region Create User
export const createUserValidationSchema = z.object(
  {
    email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
    username: zodCreateStringValidator('Username', { minLength: 3, maxLength: 20 }),
    password: z.string().min(PASS_MIN).max(PASS_MAX),
    givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
  },
  {
    invalid_type_error: 'Create user data must be an object',
    required_error: 'Create user data is required',
  },
);
export type CreateUserDto = z.infer<typeof createUserValidationSchema>;
// #endregion
