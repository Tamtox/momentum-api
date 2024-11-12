import { z } from 'zod';

export type ZodValidatorOptions = {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
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

export const createPasswordValidator = (name: string, options: ZodValidatorOptions = {}) => {
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
