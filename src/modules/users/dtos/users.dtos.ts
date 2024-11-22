import { EMAIL_MAX, EMAIL_MIN, PASS_MAX, PASS_MIN, STRING_MAX, STRING_MIN, STRING_SHORT_MAX, VERIFICATION_CODE_MAX, VERIFICATION_CODE_MIN } from 'src/common/constants/constants';
import { zodCreateBooleanValidator, zodCreateStringValidator } from 'src/common/validation/zod/validatiorFunctions';
import { z } from 'zod';

// #region Create User
export const createUserValidationSchema = z.object(
  {
    email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
    username: zodCreateStringValidator('Username', { minLength: STRING_MIN, maxLength: STRING_SHORT_MAX }),
    password: z.string().min(PASS_MIN).max(PASS_MAX),
    givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    isVerified: zodCreateBooleanValidator('Is verified').optional(),
    verificationCode: zodCreateStringValidator('Verification code', { minLength: VERIFICATION_CODE_MIN, maxLength: VERIFICATION_CODE_MAX }).optional(),
  },
  {
    invalid_type_error: 'Create user data must be an object',
    required_error: 'Create user data is required',
  },
);
export type CreateUserDto = z.infer<typeof createUserValidationSchema>;
// #endregion

// #region Update User
export const updateUserValidationSchema = z.object({ 
  id: zodCreateStringValidator('Id',{isUUID: true}),
  email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }).optional(),
  username: zodCreateStringValidator('Username', { minLength: STRING_MIN, maxLength: STRING_SHORT_MAX }).optional(),
  password: z.string().min(PASS_MIN).max(PASS_MAX).optional(),
  givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
  middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
  familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
  isVerified: zodCreateBooleanValidator('Is verified').optional(),
  verificationCode: zodCreateStringValidator('Verification code', { minLength: VERIFICATION_CODE_MIN, maxLength: VERIFICATION_CODE_MAX }).optional(),
}, {
  invalid_type_error: 'Update user data must be an object',
  required_error: 'Update user data is required',
});
export type UpdateUserDto = z.infer<typeof updateUserValidationSchema>;
// #endregion