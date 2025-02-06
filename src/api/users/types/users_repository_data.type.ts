import { User } from '../models/users.model';

// #region Create User -------------------------------------------------------------------------------------------------------------------------
export type CreateUserData = Omit<
  User,
  'id' | 'is_verified' | 'is_disabled' | 'created_at' | 'updated_at' | 'created_by'
> &
  Partial<Pick<User, 'id' | 'is_verified' | 'is_disabled' | 'created_at' | 'updated_at' | 'created_by'>>;

// #region Update User -------------------------------------------------------------------------------------------------------------------------
export type UpdateUserData = Pick<User, 'id'> & Partial<User>;
