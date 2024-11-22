import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  applicationId: uuid('application_id').notNull(),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  createdBy: uuid('createdBy').notNull(),
});

export type User = InferSelectModel<typeof users>;
