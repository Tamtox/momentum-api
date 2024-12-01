import { Admin } from 'src/modules/admins/models/admins.models';
import { User } from 'src/modules/users/models/users.model';

export type RequestProcessOptionsParams = {
  skipValidationCheck?: boolean;
  skipAuthCheck?: boolean;
  skipAccessCheck?: boolean;
  applicationId?: string;
  user?: User;
  admin?: Admin;
};

export class RequestProcessOptions {
  skipValidationCheck: boolean;
  skipAuthCheck: boolean;
  skipAccessCheck: boolean;
  applicationId: string | undefined;
  user: User | undefined;
  admin: Admin | undefined;
  constructor(params: RequestProcessOptionsParams) {
    this.skipValidationCheck = params.skipValidationCheck || false;
    this.skipAuthCheck = params.skipAuthCheck || false;
    this.skipAccessCheck = params.skipAccessCheck || false;
    this.applicationId = params.applicationId;
    this.user = params.user;
    this.admin = params.admin;
  }
}
