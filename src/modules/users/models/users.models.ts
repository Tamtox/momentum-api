import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { applications } from 'src/modules/applications/models/applications.models';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  application_id: uuid('application_id').references(() => applications.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  temporary_password: text('temporary_password'),
  is_verified: boolean('is_verified').notNull().default(false),
  verification_code: text('verification_code').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by'),
});

export type User = InferSelectModel<typeof users>;
