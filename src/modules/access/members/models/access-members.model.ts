import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { accessGroups } from 'src/modules/access/groups/models/access-groups.model';
import { users } from 'src/modules/users/models/users.model';

export const accessMembers = pgTable('access_members', {
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
