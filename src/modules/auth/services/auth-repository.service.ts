import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { CONNECTION_POOL, DRIZZLE_POOL } from 'src/database/database.module-definition';

@Injectable()
export class AuthRepositoryService {
  constructor(
    @Inject(CONNECTION_POOL) private readonly pg: Pool,
    @Inject(DRIZZLE_POOL) private readonly drizzle: NodePgDatabase,
  ) {}
}
