import {
  EMAIL_MAX,
  EMAIL_MIN,
  PASS_MAX,
  PASS_MIN,
  STRING_MAX,
  STRING_MIN,
  STRING_SHORT_MAX,
  VERIFICATION_CODE_MAX,
  VERIFICATION_CODE_MIN,
} from 'src/common/constants/constants';
import { zodPaginationValidationSchema } from 'src/common/validation/zod/commonSchemas';
import { zodCreateBooleanValidator, zodCreateStringValidator } from 'src/common/validation/zod/validatiorFunctions';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

// #region Create User ---------------------------------------------------------------------------------------------------------------------
export const createUserValidationSchema = extendApi(
  z.object(
    {
      email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
      username: zodCreateStringValidator('Username', { minLength: STRING_MIN, maxLength: STRING_SHORT_MAX }),
      password: z.string().min(PASS_MIN).max(PASS_MAX),
      givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
      middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
      familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
      isVerified: zodCreateBooleanValidator('Is verified').optional(),
      verificationCode: zodCreateStringValidator('Verification code', {
        minLength: VERIFICATION_CODE_MIN,
        maxLength: VERIFICATION_CODE_MAX,
      }).optional(),
    },
    {
      invalid_type_error: 'Create user data must be an object',
      required_error: 'Create user data is required',
    },
  ),
  {
    title: 'Create User Body',
    description: 'Create user body',
  },
);
export class CreateUserDto extends createZodDto(createUserValidationSchema) {}
// #endregion

// #region Update User ---------------------------------------------------------------------------------------------------------------------
export const updateUserValidationSchema = extendApi(
  z.object(
    {
      id: zodCreateStringValidator('Id', { isUUID: true }),
      email: zodCreateStringValidator('Email', {
        minLength: EMAIL_MIN,
        maxLength: EMAIL_MAX,
        isEmail: true,
      }).optional(),
      username: zodCreateStringValidator('Username', { minLength: STRING_MIN, maxLength: STRING_SHORT_MAX }).optional(),
      password: z.string().min(PASS_MIN).max(PASS_MAX).optional(),
      givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).nullish(),
      middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).nullish(),
      familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).nullish(),
      isVerified: zodCreateBooleanValidator('Is verified').optional(),
      verificationCode: zodCreateStringValidator('Verification code', {
        minLength: VERIFICATION_CODE_MIN,
        maxLength: VERIFICATION_CODE_MAX,
      }).optional(),
    },
    {
      invalid_type_error: 'Update user data must be an object',
      required_error: 'Update user data is required',
    },
  ),
  {
    title: 'Update User Body',
    description: 'Update user body',
  },
);
export class UpdateUserDto extends createZodDto(updateUserValidationSchema) {}
// #endregion

// #region List Users ---------------------------------------------------------------------------------------------------------------------
export const listUsersValidationSchema = z
  .object(
    {
      id: zodCreateStringValidator('Id', { isUUID: true }).optional(),
    },
    {
      invalid_type_error: 'List users data must be an object',
      required_error: 'List users data is required',
    },
  )
  .and(zodPaginationValidationSchema);
export type ListUsersDto = z.infer<typeof listUsersValidationSchema>;
// #endregion
