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
import { ConfigService } from '@nestjs/config';
// import dotenv

@Global()
@Module({
  providers: [
    {
      provide: 'PG_OPTIONS',
      inject: [ConfigService],
      useFactory: (config) => {
        const databaseOptions = {
          host: config.get('AWS_POSTGRES_HOST'),
          port: config.get('AWS_POSTGRES_PORT'),
          user: config.get('AWS_POSTGRES_USER'),
          password: config.get('AWS_POSTGRES_PASSWORD'),
          database: config.get('AWS_POSTGRES_DB'),
        };
        return databaseOptions;
      },
    },
    // Pg connection pool
    {
      provide: CONNECTION_POOL,
      inject: ['PG_OPTIONS'],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database,
          ssl: { rejectUnauthorized: false },
        });
      },
    },
    // Drizzle pool
    {
      provide: DRIZZLE_POOL,
      inject: [CONNECTION_POOL],
      useFactory: (pool: Pool) => {
        return drizzle(pool, { schema: databaseSchema });
      },
    },
  ],
  exports: [CONNECTION_POOL, DRIZZLE_POOL],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
