import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const admins = pgTable('admins', {
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
