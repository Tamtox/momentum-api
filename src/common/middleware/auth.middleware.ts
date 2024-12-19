import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom_error';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization');
    if (!authHeader) {
      throw new CustomError('Authorization header is required', HttpStatus.UNAUTHORIZED, 'Authentication error');
    }
    const bearerToken: string[] = authHeader.split(' ');
    const token: string = bearerToken[1];
    res.locals.token = token;
    next();
  }
}
