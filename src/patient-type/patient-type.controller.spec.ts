import { Test, TestingModule } from '@nestjs/testing';
import { PatientTypeController } from './patient-type.controller';

describe('PatientTypeController', () => {
  let controller: PatientTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientTypeController],
    }).compile();

    controller = module.get<PatientTypeController>(PatientTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
