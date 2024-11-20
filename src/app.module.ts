import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IdentityModule } from './modules/identity/identity.module';
import { z } from 'zod';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
      // validationSchema: z.object({
      //   POSTGRES_HOST: z.string().min(1),
      //   POSTGRES_PORT: z.number().min(1),
      //   POSTGRES_USER: z.string().min(1),
      //   POSTGRES_PASSWORD: z.string().min(1),
      //   POSTGRES_DB: z.string().min(1),
      // }),
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          user: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
        };
        return config;
      },
    }),
    NotificationsModule,
    IdentityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
