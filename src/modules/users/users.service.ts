import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CustomError } from 'src/common/errors/customError';
import { User } from './models/user.models';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import { CreateUserDto, createUserValidationSchema } from './dtos/users.dtos';
import { CONNECTION_POOL } from 'src/database/database.module-definition';
import { DrizzleService } from 'src/database/drizzle.service';
import { databaseSchema } from 'src/database/database-schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CONNECTION_POOL) private readonly pg: Pool,
    private readonly drizzle: DrizzleService,
  ) {}
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
  async createUser(body: CreateUserDto, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    const userBody = createUserValidationSchema.parse(body);
    // Step 2: Check if the user already exists
    await this.checkUserExists(null, userBody.email);
    // Step 3: Create the user
    const newUser = await this.drizzle.db.insert(databaseSchema.users).values({}).returning();
  }
  async updateUser(body: any, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    const userBody = createUserValidationSchema.parse(body);
    // Step 2: Check if the user exists
    // Step 3: Update the user
  }
  async listUsers(body: any, options: RequestProcessOptions) {
    // Step 1: Validate the request body
    // Step 2: List users
  }
}
