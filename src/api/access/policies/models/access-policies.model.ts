import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE_NAMES } from 'src/common/database/table-names';

export const accessPolicies = pgTable(TABLE_NAMES.access_policies, {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  resource_type: text('resource_type').notNull(),
  resource_id: uuid('resource_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  actions: text('actions')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by'),
});

export type AccessPolicy = InferSelectModel<typeof accessPolicies>;
export class UserDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'User ID' })
  id: string;
  @ApiProperty({ type: 'string', description: 'Type of a resource.' })
  resource_type: string;
  @ApiProperty({ type: 'string', format: 'uuid', description: 'ID of a resource.' })
  resource_id: string;
  @ApiProperty({ type: 'string', description: 'Policy name' })
  name: string;
  @ApiProperty({ type: 'string', description: 'Policy description', nullable: true })
  description: string | null;
  @ApiProperty({ type: 'array', items: { type: 'string' }, description: 'Actions allowed by this policy' })
  actions: string[];
  @ApiProperty({ type: 'string', format: 'date-time', description: 'Policy creation date' })
  created_at: Date;
  @ApiProperty({ type: 'string', format: 'date-time', description: 'Policy last update date' })
  updated_at: Date;
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Id of the user who created this policy. If null, it means the policy was created by the system.',
    nullable: true,
  })
  created_by: string | null;
}
export const ACCESS_POLICY_COLS = Object.keys(accessPolicies) as readonly (keyof AccessPolicy)[];
