import { Controller } from '@nestjs/common';
import { IdenityService } from './idenity.service';

@Controller('idenity')
export class IdenityController {
  constructor(private readonly idenityService: IdenityService) {}
}
