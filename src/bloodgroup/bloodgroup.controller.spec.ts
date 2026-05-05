import { Test, TestingModule } from '@nestjs/testing';
import { BloodgroupController } from './bloodgroup.controller';

describe('BloodgroupController', () => {
  let controller: BloodgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodgroupController],
    }).compile();

    controller = module.get<BloodgroupController>(BloodgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
