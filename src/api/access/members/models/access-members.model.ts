import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { accessGroups } from 'src/api/access/groups/models/access-groups.model';
import { users } from 'src/api/users/models/users.model';
import { TABLE_NAMES } from 'src/common/database/table-names';

export const accessMembers = pgTable(TABLE_NAMES.access_members, {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  group_id: uuid('group_id')
    .notNull()
    .references(() => accessGroups.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by'),
});

export type AccessMember = InferSelectModel<typeof accessMembers>;
