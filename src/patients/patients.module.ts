import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from 'src/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Register } from 'src/entities/register.entity';
import { Emergency } from 'src/entities/emergency.entity';
import { Medical } from 'src/entities/medical.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Contact, Register, Emergency, Medical])],
  providers: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule {}
