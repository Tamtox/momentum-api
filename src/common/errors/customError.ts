export const ERROR_IMPORTANCE = Array.from({ length: 10 }, (_, i) => i + 1);
export type ErrorImportance = typeof ERROR_IMPORTANCE[number];
export class CustomError extends Error {
  status: number;
  level: ErrorImportance;
  constructor(message: string, status: number, level: ErrorImportance = 1) {
    super(message);
    this.status = status;
    this.level = level;
  }
}
