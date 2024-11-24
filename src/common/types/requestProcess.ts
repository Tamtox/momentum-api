import { Admin } from 'src/modules/admins/models/admins.models';
import { User } from 'src/modules/users/models/users.models';

export type RequestProcessOptions = {
  skipValidation?: boolean;
  skipAuth?: boolean;
  applicationId?: string;
  user?: User | undefined;
  admin?: Admin | undefined;
};
