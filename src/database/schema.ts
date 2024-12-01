import { accessAttachments } from 'src/modules/access/attachments/models/access-attachments.model';
import { accessGroups } from 'src/modules/access/groups/models/access-groups.model';
import { accessMembers } from 'src/modules/access/members/models/access-members.model';
import { accessPolicies } from 'src/modules/access/policies/models/access-policies.model';
import { admins } from 'src/modules/admins/models/admins.models';
import { applications } from 'src/modules/applications/models/applications.model';
import { users } from 'src/modules/users/models/users.model';

export const databaseSchema = {
  ...admins,
  ...applications,
  ...accessAttachments,
  ...accessGroups,
  ...accessMembers,
  ...accessPolicies,
  ...users,
};
