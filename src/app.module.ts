import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AccessModule } from './modules/access/access.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AdminsModule } from './modules/admins/admins.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
