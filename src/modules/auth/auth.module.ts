import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, AdminsModule],
})
export class AuthModule {}
