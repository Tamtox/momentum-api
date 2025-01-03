import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { TABLE_NAMES } from 'src/common/database/table_names';

export const admins = pgTable(TABLE_NAMES.admins, {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by').notNull(),
});

export type Admin = InferSelectModel<typeof admins>;
