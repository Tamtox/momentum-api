import { Global, Module } from '@nestjs/common';
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DRIZZLE_POOL,
  DATABASE_OPTIONS,
  DatabaseOptions,
} from './database.module-definition';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { databaseSchema } from './database-schema';

@Global()
@Module({
  providers: [
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
          ssl: false,
        });
      },
    },
    {
      provide: DRIZZLE_POOL,
      inject: [CONNECTION_POOL],
      useFactory: (pool: Pool) => {
        return drizzle(pool, { schema: databaseSchema });
      },
    },
  ],
  exports: [DRIZZLE_POOL, CONNECTION_POOL],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
