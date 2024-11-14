import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CustomError } from 'src/common/errors/customError';
import { User } from './models/user.models';
import { RequestProcessOptions } from 'src/common/types/requestProcess';
import { CreateUserDto, createUserValidationSchema } from './dtos/user.dtos';

@Injectable()
export class UsersService {
  @Inject('PG_POOL') private readonly pg: Pool;
  async getUser(id: string | null, email: string | null) {
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST);
    }
    let query = `SELECT * FROM users WHERE 1 = 1`;
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
    const { rows } = await this.pg.query(query, [id, email]);
    let user: User | null = null;
    if (rows.length) {
      user = rows[0];
    }
    return user;
  }
  async checkUserExists(id: string | null, email: string | null) {
    if (!id && !email) {
      throw new CustomError('Id or email is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.getUser(id, email);
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
  }
}
