import { z } from 'zod';

export type ZodValidatorOptions = {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isUUID?: boolean;
  dateType?: 'date' | 'datetime' | 'time';
};

export const zodCreateStringValidator = (name: string, options: ZodValidatorOptions = {}) => {
  let stringValidator = z.string({
    message: `${name} must be a string`,
    invalid_type_error: `${name} must be a string`,
    required_error: `${name} is required`,
  });
  if (options.minLength) {
    stringValidator = stringValidator.min(options.minLength);
  }
  if (options.maxLength) {
    stringValidator = stringValidator.max(options.maxLength);
  }
  if (options.isEmail) {
    stringValidator = stringValidator.email({
      message: `${name} must be a valid email`,
    });
  }
  if (options.isUUID) {
    return stringValidator.uuid({
      message: `${name} must be a valid UUID`,
    });
  }
  return stringValidator;
};

export const zodCreateNumberValidator = (name: string, options: ZodValidatorOptions = {}) => {
  let numberValidator = z.number({
    message: `${name} must be a number`,
    invalid_type_error: `${name} must be a number`,
    required_error: `${name} is required`,
  });
  if (options.min) {
    numberValidator = numberValidator.min(options.min);
  }
  if (options.max) {
    numberValidator = numberValidator.max(options.max);
  }
  return numberValidator;
};

export const zodCreatePasswordValidator = (name: string, options: ZodValidatorOptions = {}) => {
  let passwordValidator = z.string({
    message: `${name} must be a string`,
    invalid_type_error: `${name} must be a string`,
    required_error: `${name} is required`,
  });
  if (options.minLength) {
    passwordValidator = passwordValidator.min(options.minLength);
  }
  if (options.maxLength) {
    passwordValidator = passwordValidator.max(options.maxLength);
  }
  // Lowercase, uppercase, number, special character
  passwordValidator = passwordValidator.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    {
      message: `${name} must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character`,
    },
  );
  return passwordValidator;
};

export const zodCreateDateValidator = (name: string, options?: { dateType?: 'date' | 'datetime' | 'time' }) => {
  let dateType = options?.dateType || 'datetime';
  let dateValidator = z.string({
    message: `${name} must be a date`,
    invalid_type_error: `${name} must be a date`,
    required_error: `${name} is required`,
  });
  if (dateType === 'date') {
    dateValidator = dateValidator.date(`${name} must have valid date format`);
  } else if (dateType === 'datetime') {
    dateValidator = dateValidator.datetime(`${name} must have valid date time format`);
  } else {
    dateValidator = dateValidator.time(`${name} must have valid time format`);
  }
  return dateValidator;
};

export const zodCreateBooleanValidator = (name: string, options: ZodValidatorOptions = {}) => {
  let booleanValidator = z.boolean({
    message: `${name} must be a boolean`,
    invalid_type_error: `${name} must be a boolean`,
    required_error: `${name} is required`,
  });
  return booleanValidator;
};
export const zodCreateEnumValidator = (name: string, values: readonly string[]) => {
  // @ts-ignore-next-line
  let enumValidator = z.enum(values, {
    message: `${name} must be one of ${values.join(', ')}`,
    invalid_enum_error: `${name} must be one of ${values.join(', ')}`,
    required_error: `${name} is required`,
  });
  return enumValidator;
};
