import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const applications = pgTable('applications', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by').notNull(),
});

export type Application = InferSelectModel<typeof applications>;
