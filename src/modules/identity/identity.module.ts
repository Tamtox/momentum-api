import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AccessModule, AuthModule],
})
export class IdentityModule {}
