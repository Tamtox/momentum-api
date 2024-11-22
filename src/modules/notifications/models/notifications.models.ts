import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';

export const notifications = pgTable('notifications', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  applicationId: uuid('application_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  createdBy: uuid('createdBy').notNull(),
});

export type Notification = InferSelectModel<typeof notifications>;

export const notificationInstances = pgTable('notification_instances', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  notificationId: uuid('notification_id').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  readAt: timestamp('readAt'),
});

export type NotificationInstance = InferSelectModel<typeof notificationInstances>;
