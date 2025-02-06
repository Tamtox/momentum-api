import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepositoryService } from './services/users-repository.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService, JwtService],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
