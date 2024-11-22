import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const tokens = pgTable('tokens', {
  id: uuid('id'),
  token: text('token').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  validUntil: timestamp('validUntil').notNull(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export type Admin = InferSelectModel<typeof tokens>;
