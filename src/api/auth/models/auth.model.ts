import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { admins } from 'src/modules/admins/models/admins.model';
import { users } from 'src/modules/users/models/users.model';
import { TABLE_NAMES } from 'src/common/database/table_names';

export const tokens = pgTable(TABLE_NAMES.tokens, {
  id: uuid('id'),
  token: text('token').notNull(),
  admin_id: uuid('admin_id').references(() => admins.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  valid_until: timestamp('valid_until').notNull(),
});

export type Tokens = InferSelectModel<typeof tokens>;
