import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  temporary_password: text('temporary_password'),
  is_verified: boolean('is_verified').default(false),
  verification_code: text('verification_code').notNull(),
  type: text('type').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  created_by: uuid('created_by'),
});

export type User = InferSelectModel<typeof users>;
