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
import {
  zodCreateBooleanValidator,
  zodCreateDateValidator,
  zodCreateEnumValidator,
  zodCreateStringValidator,
} from 'src/common/validation/zod/validatorFunctions';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { zodQueryArrayToStringArrayPreprocessor } from 'src/common/validation/zod/preprocessors';
import { USER_TYPES } from '../constants/users.constants';

// #region Create User ---------------------------------------------------------------------------------------------------------------------
export const createUserValidationSchema = z.object(
  {
    email: zodCreateStringValidator('Email', { minLength: EMAIL_MIN, maxLength: EMAIL_MAX, isEmail: true }),
    username: zodCreateStringValidator('Username', { minLength: STRING_MIN, maxLength: STRING_SHORT_MAX }),
    password: z.string().min(PASS_MIN).max(PASS_MAX),
    temporaryPassword: z.string().min(PASS_MIN).max(PASS_MAX).optional(),
    type: zodCreateEnumValidator('Type', USER_TYPES).optional(),
    givenName: zodCreateStringValidator('Given name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    middleName: zodCreateStringValidator('Middle name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    familyName: zodCreateStringValidator('Family name', { minLength: STRING_MIN, maxLength: STRING_MAX }).optional(),
    isVerified: zodCreateBooleanValidator('Is verified').optional(),
    isDisabled: zodCreateBooleanValidator('Is disabled').optional(),
    verificationCode: zodCreateStringValidator('Verification code', {
      minLength: VERIFICATION_CODE_MIN,
      maxLength: VERIFICATION_CODE_MAX,
    }).optional(),
  },
  {
    invalid_type_error: 'Create user body must be an object',
    required_error: 'Create user body is required',
  },
);
export class CreateUserDto extends createZodDto(createUserValidationSchema) {}
// #endregion

// #region Update User ---------------------------------------------------------------------------------------------------------------------
export const updateUserValidationSchema = z.object(
  {
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
);
export class UpdateUserDto extends createZodDto(updateUserValidationSchema) {}
// #endregion

// #region List Users ---------------------------------------------------------------------------------------------------------------------
export const listUsersValidationSchema = z
  .object(
    {
      ids: z
        .preprocess(zodQueryArrayToStringArrayPreprocessor, z.array(zodCreateStringValidator('Id', { isUUID: true })))
        .optional(),
      excludedIds: z.array(zodCreateStringValidator('Id', { isUUID: true })).optional(),
      createdAtStart: zodCreateDateValidator('Created at start').optional(),
      createdAtEnd: zodCreateDateValidator('Created at end').optional(),
      updatedAtStart: zodCreateDateValidator('Updated at start').optional(),
      updatedAtEnd: zodCreateDateValidator('Updated at end').optional(),
      createdBy: z.array(zodCreateStringValidator('Created by', { isUUID: true })).optional(),
      excludeCreatedBy: z.array(zodCreateStringValidator('Exclude created by', { isUUID: true })).optional(),
    },
    {
      invalid_type_error: 'List users data must be an object',
      required_error: 'List users data is required',
    },
  )
  .and(zodPaginationValidationSchema);
export type ListUsersDto = z.infer<typeof listUsersValidationSchema>;
// #endregion
