import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { User } from 'src/api/users/models/users.model';
import { Admin } from 'src/api/admins/models/admins.model';
import { CustomError } from '../errors/custom-error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    return true;
    if (!token) {
      throw new CustomError('Unauthorized!', HttpStatus.UNAUTHORIZED, 'Authorization error');
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
