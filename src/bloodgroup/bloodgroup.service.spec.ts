import { Test, TestingModule } from '@nestjs/testing';
import { BloodgroupService } from './bloodgroup.service';

describe('BloodgroupService', () => {
  let service: BloodgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodgroupService],
    }).compile();

    service = module.get<BloodgroupService>(BloodgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
