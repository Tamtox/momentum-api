import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { accessPolicies } from 'src/api/access/policies/models/access-policies.model';
import { TABLE_NAMES } from 'src/common/database/table-names';

export const accessGroups = pgTable(TABLE_NAMES.access_groups, {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  policy_id: uuid('policy_id').references(() => accessPolicies.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by'),
});

export type AccessGroup = InferSelectModel<typeof accessGroups>;
