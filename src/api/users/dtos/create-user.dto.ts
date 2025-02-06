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
import {
  zodCreateBooleanValidator,
  zodCreateDateValidator,
  zodCreateEnumValidator,
  zodCreateStringValidator,
} from 'src/common/validation/zod/validatorFunctions';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { USER_TYPES } from '../constants/users.constants';

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
