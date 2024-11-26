import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule],
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
    {
      provide: 'PG_POOL',
      inject: ['PG_OPTIONS'],
      useFactory: (options) =>
        new Pool({
          host: options.host,
          port: options.port,
          database: options.database,
          user: options.user,
          password: options.password,
        }),
    },
  ],
  exports: ['PG_POOL'],
})
export class PgModule {}
