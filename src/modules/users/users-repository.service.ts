import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { CustomError } from 'src/common/errors/customError';
import { CONNECTION_POOL, DRIZZLE_POOL } from 'src/database/database.module-definition';
import { User } from './models/users.model';
import { CreateUserData, UpdateUserData } from './types/users.types';
import { generateInsertionQuery } from 'src/common/postgresql/query_builders';
import { RepositoryOptions } from 'src/common/types/repository';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @Inject(CONNECTION_POOL) private readonly pg: Pool,
    @Inject(DRIZZLE_POOL) private readonly drizzle: NodePgDatabase,
  ) {}
  // #region Get User -------------------------------------------------------------------------------------------------------------------------
  async getUser(id: string | null, email: string | null) {
    const serviceName = 'getUserRepository';
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    let query = `SELECT * FROM users WHERE application_id = $1`;
    if (id) {
      query += ` AND id = $1`;
    }
    if (email) {
      query += ` AND email = $2`;
    }
    const vals: string[] = [];
    if (id) {
      vals.push(id);
    }
    if (email) {
      vals.push(email);
    }
    const { rows } = await this.pg.query(query, vals);
    let user: User | null = null;
    if (rows.length) {
      user = rows[0];
    }
    return user;
  }
  // #endregion
  // #region Create User -------------------------------------------------------------------------------------------------------------------------
  async createUser(userData: CreateUserData, options?: RepositoryOptions<User>) {
    const serviceName = 'createUserRepository';
    const keys = Object.keys(userData) as (keyof CreateUserData)[];
    const vals = keys.map((key) => userData[key]);
    let query = `INSERT INTO users 
    ${keys.join(', ')} 
    VALUES 
    ${keys.map((_, i) => `$${i + 1}`).join(', ')}`;
    if (options?.returning) {
      if (options.returning === '*') {
        query += ` RETURNING *`;
      } else {
        query += ` RETURNING ${options.returning.join(', ')}`;
      }
    }
    const userRes = await this.pg.query(query, vals);
    const user = userRes.rows[0];
    return user;
  }
  // #endregion
  // #region Create Users -------------------------------------------------------------------------------------------------------------------------
  async createUsers(usersData: CreateUserData[], options?: RepositoryOptions<User>) {
    const serviceName = 'createUsersRepository';
    const keys = Object.keys(usersData[0]) as (keyof CreateUserData)[];
    const vals: any[] = [];
    let query = `INSERT INTO users
    ${keys.join(', ')}
    VALUES`;
    let index = 1;
    usersData.forEach((userData, i) => {
      const userVals = keys.map((key) => userData[key]);
      query += `(${keys.map((_, i) => `$${index + i}`).join(', ')})`;
      if (i < usersData.length - 1) {
        query += `,`;
      }
      vals.push(...userVals);
      index += keys.length;
    });
    if (options?.returning) {
      if (options.returning === '*') {
        query += ` RETURNING *`;
      } else {
        query += ` RETURNING ${options.returning.join(', ')}`;
      }
    }
    const usersRes = await this.pg.query(query, vals);
    const users = usersRes.rows;
    return users;
  }
  // #region Update User -------------------------------------------------------------------------------------------------------------------------
  async updateUser(userData: UpdateUserData, options?: RepositoryOptions<User>) {
    const serviceName = 'updateUserRepository';
    const id = userData.id;
    if (!id) {
      throw new CustomError('User Id is required', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    const keys = Object.keys(userData) as (keyof UpdateUserData)[];
    const vals: any[] = [];
    let query = `UPDATE users SET`;
    const excludedKeys = ['id', 'created_at'];
    keys.forEach((key, i) => {
      if (excludedKeys.includes(key)) return;
      const val = key === 'updated_at' ? new Date() : userData[key];
      let subQuery = `${key} = $${i + 1}`;
      if (i < keys.length - 1) {
        subQuery += `,`;
      }
      query += ` ${subQuery}`;
      vals.push(val);
    });
    query += ` WHERE id = $${vals.length + 1}`;
    vals.push(id);
    if (options?.returning) {
      if (options.returning === '*') {
        query += ` RETURNING *`;
      } else {
        query += ` RETURNING ${options.returning.join(', ')}`;
      }
    }
    const userRes = await this.pg.query(query, vals);
    const user = userRes.rows[0];
    return user;
  }
  // #endregion
  // #region Delete User -------------------------------------------------------------------------------------------------------------------------
  async deleteUser(id: string, options?: RepositoryOptions<User>) {
    const serviceName = 'deleteUserRepository';
    if (!id) {
      throw new CustomError('User Id is required', HttpStatus.BAD_REQUEST, 'Validation error');
    }
    let query = `DELETE FROM users WHERE id = $1`;
    if (options?.returning) {
      if (options.returning === '*') {
        query += ` RETURNING *`;
      } else {
        query += ` RETURNING ${options.returning.join(', ')}`;
      }
    }
    const { rows } = await this.pg.query(query, [id]);
    let user: User | null = null;
    if (rows.length) {
      user = rows[0];
    }
    return user;
  }
  // #endregion
  // #region List Users --------------------------------------------------------------------------------------------------------------------------
  async listUsers(options: RepositoryOptions<User>) {
    const serviceName = 'listUsersRepository';
    let query = `SELECT`;
    if (options?.returning) {
      if (options.returning === '*') {
        query += ` *`;
      } else {
        query += ` ${options.returning.join(', ')}`;
      }
    } else {
      query += ` *`;
    }
    query += ` FROM users`;
    const { rows } = await this.pg.query(query, []);
    return rows as User[];
  }
  // #endregion
}
