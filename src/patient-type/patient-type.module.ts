import { Module } from '@nestjs/common';
import { PatientTypeService } from './patient-type.service';
import { PatientTypeController } from './patient-type.controller';
import { PatientType } from 'src/entities/patientType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PatientType])],
  providers: [PatientTypeService],
  controllers: [PatientTypeController]
})
export class PatientTypeModule {}
