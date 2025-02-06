import { User } from '../models/users.model';

export type CreateUserData = Omit<
  User,
  'id' | 'is_verified' | 'is_disabled' | 'created_at' | 'updated_at' | 'created_by'
> &
  Partial<Pick<User, 'id' | 'is_verified' | 'is_disabled' | 'created_at' | 'updated_at' | 'created_by'>>;

export type UpdateUserData = Pick<User, 'id'> & Partial<User>;
