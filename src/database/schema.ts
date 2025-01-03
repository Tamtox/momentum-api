import { accessGroups } from 'src/modules/access/groups/models/access-groups.model';
import { accessMembers } from 'src/modules/access/members/models/access-members.model';
import { accessPolicies } from 'src/modules/access/policies/models/access-policies.model';
import { admins } from 'src/modules/admins/models/admins.model';
import { users } from 'src/modules/users/models/users.model';

export const databaseSchema = {
  ...admins,
  ...accessGroups,
  ...accessMembers,
  ...accessPolicies,
  ...users,
};
