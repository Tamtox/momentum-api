import { Module } from '@nestjs/common';
import { IdenityService } from './idenity.service';
import { IdenityController } from './idenity.controller';
import { UsersModule } from './users/users.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [IdenityController],
  providers: [IdenityService],
  imports: [UsersModule, AccessModule, AuthModule],
})
export class IdenityModule {}
