import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CustomError } from 'src/common/errors/customError';
import { User } from './models/users.models';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import {
  CreateUserDto,
  createUserValidationSchema,
  ListUsersDto,
  listUsersValidationSchema,
  UpdateUserDto,
  updateUserValidationSchema,
} from './dtos/users.dtos';
import { CONNECTION_POOL, DRIZZLE_POOL } from 'src/database/database.module-definition';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CONNECTION_POOL) private readonly pg: Pool,
    @Inject(DRIZZLE_POOL) private readonly drizzle: NodePgDatabase,
  ) {}
  // #region Get User -------------------------------------------------------------------------------------------------------------------------
  async getUser(applicationId: string, id: string | null, email: string | null) {
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST);
    }
    let query = `SELECT * FROM users WHERE application_id = $1`;
    if (id) {
      query += ` AND id = $1`;
    }
    if (email) {
      query += ` AND email = $2`;
    }
    const vals: string[] = [applicationId];
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
  async checkUserExists(applicationId: string, id: string | null, email: string | null) {
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.getUser(applicationId, id, email);
    if (!user) {
      throw new CustomError('User does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  // #endregion
  // #region Create User -------------------------------------------------------------------------------------------------------------------------
  async createUser(body: CreateUserDto, options: RequestProcessOptions) {
    const applicationId = options.applicationId;
    console.log(this.drizzle);
    if (!applicationId) {
      throw new CustomError('Application Id is required', HttpStatus.BAD_REQUEST);
    }
    // Step 1: Validate the request body
    const userBody = createUserValidationSchema.parse(body);
    // Step 2: Check if the user already exists
    await this.checkUserExists(applicationId, null, userBody.email);
    // Step 3: Create the user
  }
  // #endregion
  // #region Update User -------------------------------------------------------------------------------------------------------------------------
  async updateUser(body: UpdateUserDto, options: RequestProcessOptions) {
    const applicationId = options.applicationId;
    if (!applicationId) {
      throw new CustomError('Application Id is required', HttpStatus.BAD_REQUEST);
    }
    // Step 1: Validate the request body
    const userBody = updateUserValidationSchema.parse(body);
    // Step 2: Check if the user exists
    const existingUser = await this.checkUserExists(applicationId, userBody.id, null);
    // Step 3: Update the user
    // Check if email is already taken
    if (userBody.email && userBody.email !== existingUser.email) {
      await this.checkUserExists(applicationId, null, userBody.email);
    }
  }
  // #endregion
  // #region Delete User -------------------------------------------------------------------------------------------------------------------------
  async deleteUser(body: any, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    // Step 2: Check if the user exists
    // Step 3: Delete the user
  }
  // #endregion
  // #region List Users -------------------------------------------------------------------------------------------------------------------------
  async listUsers(queries: ListUsersDto, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    if (options.skipValidation !== true) {
      queries = listUsersValidationSchema.parse(queries);
    }
    // Step 2: List users
  }
  // #endregion
}
