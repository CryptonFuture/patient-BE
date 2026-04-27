import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { System } from 'src/entities/systemFields.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Schedule, System, Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
