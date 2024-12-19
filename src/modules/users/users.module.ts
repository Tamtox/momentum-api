import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositoryService } from './users-repository.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService, JwtService],
  imports: [],
})
export class UsersModule {}
