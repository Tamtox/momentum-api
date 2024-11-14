import { Test, TestingModule } from '@nestjs/testing';
import { IdenityController } from './idenity.controller';
import { IdenityService } from './idenity.service';

describe('IdenityController', () => {
  let controller: IdenityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdenityController],
      providers: [IdenityService],
    }).compile();

    controller = module.get<IdenityController>(IdenityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
