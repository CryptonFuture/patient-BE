import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientRepo: Repository<Patient>
    ) {}

    async create(dto: CreatePatientDto) {
        const patient = this.patientRepo.create(dto)
        await this.patientRepo.save(patient)

        return {
            success: true,
            status: 200,
            message: 'Patient created successfully',
        }
    }

    async findAll() {
        const patients = await this.patientRepo.find()

         if (!patients || patients.length === 0) {
            return {
                success: false,
                status: 404,
                message: 'No record found',
                data: [],
            };
        }

        return {
            data: patients,
        };
    }

    async findOne(id: number): Promise<Patient> {
        const patients = await this.patientRepo.findOne({ where: { id } })
        if (!patients) throw new NotFoundException('User not found');
        return patients;
    }

    async update(id: number, dto: UpdatePatientDto) {
        const patients = await this.findOne(id)
        Object.assign(patients, dto)
        this.patientRepo.save(patients)

        return {
            success: true,
            status: 200,
            message: 'Patient Updated Successfully',
        }
        
    }

    async remove(id: number): Promise<{ message: string }> {
        const patients = await this.findOne(id)
        await this.patientRepo.remove(patients)
        return { message: 'Patient Deleted Successfully' };
    }

}
