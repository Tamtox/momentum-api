import { accessGroups } from 'src/api/access/groups/models/access-groups.model';
import { accessMembers } from 'src/api/access/members/models/access-members.model';
import { accessPolicies } from 'src/api/access/policies/models/access-policies.model';
import { admins } from 'src/api/admins/models/admins.model';
import { users } from 'src/api/users/models/users.model';

export const databaseSchema = {
  ...admins,
  ...accessGroups,
  ...accessMembers,
  ...accessPolicies,
  ...users,
};
