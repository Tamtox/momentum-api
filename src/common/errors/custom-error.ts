export const ERROR_IMPORTANCE = Array.from({ length: 10 }, (_, i) => i + 1);
export type ErrorImportanceLevel = (typeof ERROR_IMPORTANCE)[number];
export type CustomErrorType =
  | 'Internal server error'
  | 'Validation error'
  | 'Custom error'
  | 'Authorization error'
  | 'Authentication error';
export class CustomError extends Error {
  statusCode: number;
  level: ErrorImportanceLevel;
  type: CustomErrorType;
  constructor(message: string, statusCode: number, type: CustomErrorType, level: ErrorImportanceLevel = 1) {
    super(message);
    this.statusCode = statusCode;
    this.level = level;
    this.type = type;
  }
}
