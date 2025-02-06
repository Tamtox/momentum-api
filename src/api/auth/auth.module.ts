import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepositoryService } from './services/auth-repository.service';
import { UsersService } from '../users/services/users.service';
import { AdminsService } from '../admins/services/admins.service';
import { UsersRepositoryService } from '../users/services/users-repository.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, UsersService, UsersRepositoryService, AdminsService, JwtService],
})
export class AuthModule {}
