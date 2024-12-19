import { Locals } from 'express';
import { RequestProcessOptions } from '../types/requestProcess';

export const setRequestProcessOptions = (data: Record<string, any> & Locals): RequestProcessOptions => {
  const options = new RequestProcessOptions({
    applicationId: data.applicationId,
    skipAccessCheck: data.admin ? true : false,
    skipAuthCheck: data.admin ? true : false,
    skipValidationCheck: false,
    user: data.user,
    admin: data.admin,
  });
  return options;
};
