import { Test, TestingModule } from '@nestjs/testing';
import { IdenityService } from './idenity.service';

describe('IdenityService', () => {
  let service: IdenityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdenityService],
    }).compile();

    service = module.get<IdenityService>(IdenityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
