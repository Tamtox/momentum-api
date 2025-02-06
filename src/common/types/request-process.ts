import { Locals } from 'express';
import { Admin } from 'src/api/admins/models/admins.model';
import { User } from 'src/api/users/models/users.model';

export type RequestProcessOptionsParams = {
  skipAccessCheck?: boolean;
  applicationId?: string;
  user?: User;
  admin?: Admin;
  actions?: string[];
};

export class RequestProcessOptions {
  skipAccessCheck: boolean;
  applicationId: string | undefined;
  user: User | undefined;
  admin: Admin | undefined;
  actions: readonly string[] | undefined;
  constructor(params: RequestProcessOptionsParams) {
    this.skipAccessCheck = params.skipAccessCheck || false;
    this.applicationId = params.applicationId;
    this.user = params.user;
    this.admin = params.admin;
    this.actions = params.actions;
  }
}

export const setRequestProcessOptions = (
  data: Record<string, any> & Locals,
  skipAccessCheck?: boolean,
  actions?: string[],
): RequestProcessOptions => {
  const options = new RequestProcessOptions({
    applicationId: data.applicationId,
    skipAccessCheck,
    user: data.user,
    admin: data.admin,
    actions,
  });
  return options;
};
