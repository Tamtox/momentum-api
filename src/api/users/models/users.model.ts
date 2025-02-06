import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql, InferSelectModel } from 'drizzle-orm';
import { ApiProperty } from '@nestjs/swagger';
import { USER_TYPES, UserType } from '../constants/users.constants';
import { TABLE_NAMES } from 'src/common/database/table-names';

export const users = pgTable(TABLE_NAMES.users, {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  temporary_password: text('temporary_password'),
  is_verified: boolean('is_verified').default(false),
  is_disabled: boolean('is_disabled').default(false),
  verification_code: text('verification_code').notNull(),
  type: text('type').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  last_login_at: timestamp('last_login_at'),
  last_online_at: timestamp('last_online_at'),
  created_by: uuid('created_by'),
});
export type User = InferSelectModel<typeof users>;
export const USER_COLS = Object.keys(users) as readonly (keyof User)[];

export class UserDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'User ID' })
  id: string;
  @ApiProperty({ type: 'string', format: 'email', description: 'User email' })
  email: string;
  @ApiProperty({ type: 'string', description: 'User name' })
  username: string;
  @ApiProperty({ type: 'string', format: 'password', description: 'User password' })
  password: string;
  @ApiProperty({ type: 'string', format: 'password', description: 'Password during password reset.', nullable: true })
  temporary_password: string | null;
  @ApiProperty({ type: 'boolean', description: 'Is user verified' })
  is_verified: boolean;
  @ApiProperty({ type: 'boolean', description: 'Is user disabled' })
  is_disabled: boolean;
  @ApiProperty({ type: 'string', description: 'Verification code for email verification' })
  verification_code: string;
  @ApiProperty({ type: 'string', format: 'enum', enum: USER_TYPES, description: 'User type' })
  type: string;
  @ApiProperty({ type: 'string', format: 'date-time', description: 'User creation date' })
  created_at: Date;
  @ApiProperty({ type: 'string', format: 'date-time', description: 'User last update date' })
  updated_at: Date;
  @ApiProperty({ type: 'string', format: 'date-time', description: 'User last login date', nullable: true })
  last_login_at: Date | null;
  @ApiProperty({ type: 'string', format: 'date-time', description: 'User last online date', nullable: true })
  last_online_at: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Id of the admin or user who created this user. Null value means the user was created by the system.',
    nullable: true,
  })
  created_by: string | null;
}
