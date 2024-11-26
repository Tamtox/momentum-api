import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { z } from 'zod';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const responseBody: {
      statusCode: number;
      type: string;
      timestamp: string;
      details: any;
    } = {
      statusCode: exception instanceof HttpException ? exception.getStatus() : 500,
      type: 'Internal server error',
      timestamp: new Date().toISOString(),
      details: null,
    };
    if (exception instanceof z.ZodError) {
      const errors = exception.errors;
      responseBody.details = {
        errors: errors,
      };
      responseBody.statusCode = HttpStatus.BAD_REQUEST;
      responseBody.type = 'Validation error';
    }
    response.status(responseBody.statusCode).json(responseBody);
  }
}
