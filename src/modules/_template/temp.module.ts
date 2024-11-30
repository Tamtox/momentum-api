import { Module } from '@nestjs/common';
import { AuthService } from './temp.service';
import { AuthController } from './temp.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
