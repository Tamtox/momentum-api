import { Controller } from '@nestjs/common';
import { PoliciesService } from '../services/policies.service';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}
}
