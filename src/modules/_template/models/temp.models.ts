import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const example = pgTable('examples', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v7()`),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  createdBy: uuid('createdBy')
    .notNull()
    .references(() => example.id, { onDelete: 'cascade' }),
});

export type Example = InferSelectModel<typeof example>;
