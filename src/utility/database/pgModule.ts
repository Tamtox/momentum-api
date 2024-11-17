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
        return {
          host: config.get('SUPABASE_HOST'),
          port: config.get('SUPABASE_PORT'),
          name: config.get('SUPABASE_DB'),
          user: config.get('SUPABASE_USER'),
          password: config.get('SUPABASE_PASSWORD'),
        };
      },
    },
    {
      provide: 'PG_POOL',
      inject: ['PG_OPTIONS'],
      useFactory: (options) =>
        new Pool({
          host: options.host,
          port: options.port,
          database: options.name,
          user: options.user,
          password: options.password,
        }),
    },
  ],
  exports: ['PG_POOL'],
})
export class PgModule {}
