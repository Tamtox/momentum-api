import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PgModule } from 'src/utility/database/pgModule';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PgModule],
})
export class UsersModule {}
