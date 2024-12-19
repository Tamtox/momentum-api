import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACTION_KEY } from '../decorators/authorization_action.decorator';
import { User } from 'src/modules/users/models/users.model';
import { Admin } from 'src/modules/admins/models/admins.model';
import { CustomError } from '../errors/custom_error';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const actions = this.reflector.get<string[]>(ACTION_KEY, context.getHandler());
    // throw new CustomError('Access denied!', HttpStatus.UNAUTHORIZED, 'Authorization error');
    if (!actions || actions.length === 0) {
      return true; // If no actions are defined, allow access
    }
    const res = context.switchToHttp().getResponse();
    const user = res.locals.user as User;
    const admin = res.locals.admin as Admin;
    return true;
    if (admin) {
      return true; // Admins have access to all actions
    }
    if (!user) {
      throw new CustomError('Unauthorized!', HttpStatus.UNAUTHORIZED, 'Authorization error');
    }
    // Retrieve users memberships and access groups
    // Retrieve user's access policies
    // Check if user has access to the actions
    return true; // Access granted
  }
}
