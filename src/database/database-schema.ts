import { applications } from 'src/modules/applications/models/applications.models';
import { admins } from 'src/modules/admins/models/admins.models';
import { tokens } from 'src/modules/auth/models/auth.models';
import { notifications, notificationInstances } from 'src/modules/notifications/models/notifications.models';
import { users } from 'src/modules/users/models/users.models';

export const databaseSchema = {
  applications,
  admins,
  tokens,
  notifications,
  notificationInstances,
  users,
};
