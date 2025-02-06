import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { AccessModule } from './api/access/access.module';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './api/admins/admins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
      // validationSchema: z.object({
      //   POSTGRES_HOST: z.string().min(1),
      //   POSTGRES_PORT: z.number().min(1),
      //   POSTGRES_USER: z.string().min(1),
      //   POSTGRES_PASSWORD: z.string().min(1),
      //   POSTGRES_DB: z.string().min(1),
      // }),
    }),
    DatabaseModule,
    UsersModule,
    AccessModule,
    AuthModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
