import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { PoliciesModule } from './policies/policies.module';
import { GroupsModule } from './groups/groups.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { MembersModule } from './members/members.module';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
  imports: [PoliciesModule, GroupsModule, AttachmentsModule, MembersModule],
})
export class AccessModule {}
