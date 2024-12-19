import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepositoryService } from './auth-repository.service';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { UsersRepositoryService } from '../users/users-repository.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, UsersService, UsersRepositoryService, AdminsService, JwtService],
})
export class AuthModule {}
