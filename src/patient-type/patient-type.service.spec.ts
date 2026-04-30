import { Test, TestingModule } from '@nestjs/testing';
import { PatientTypeService } from './patient-type.service';

describe('PatientTypeService', () => {
  let service: PatientTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientTypeService],
    }).compile();

    service = module.get<PatientTypeService>(PatientTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
