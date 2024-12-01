import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { applications } from 'src/modules/applications/models/applications.model';
import { accessPolicies } from 'src/modules/access/policies/models/access-policies.model';

export const accessGroups = pgTable('access_groups', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  application_id: uuid('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  policy_id: uuid('policy_id').references(() => accessPolicies.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by'),
});

export type Application = InferSelectModel<typeof accessGroups>;
