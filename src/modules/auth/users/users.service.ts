import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Pool } from 'pg';
import { CustomError } from 'src/common/errors/customError';
import { User } from './models/user.models';
import { SignUpDto } from './dtos/user.dtos';
import { RequestProcessOptions } from 'src/common/types/requestProccess';
import { ErrorTracer } from 'src/common/errors/errorTracer';

@Injectable()
export class UsersService {
  @Inject('PG_POOL') private readonly pg: Pool;
  async checkUserExists(id: string | null, email: string | null) {
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
  async signUpProcess(body: SignUpDto, options: RequestProcessOptions, errorTracer: ErrorTracer) {}
}
