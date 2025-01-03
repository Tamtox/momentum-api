import { Module } from '@nestjs/common';
import { PoliciesService } from './services/policies.service';
import { PoliciesController } from './controllers/policies.controller';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PoliciesModule {}
