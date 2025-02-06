import { Module } from '@nestjs/common';
import { PoliciesModule } from './policies/policies.module';
import { GroupsModule } from './groups/groups.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [PoliciesModule, GroupsModule, MembersModule],
  exports: [PoliciesModule, GroupsModule, MembersModule],
})
export class AccessModule {}
