import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const tokens = pgTable('tokens', {
  id: uuid('id'),
  token: text('token').notNull(),
  user_id: uuid('user_id').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  valid_until: timestamp('valid_until').notNull(),
});

export type Admin = InferSelectModel<typeof tokens>;
