import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PatientType } from 'src/entities/patientType.entity';

@Injectable()
export class PatientTypeService {
    constructor(
        @InjectRepository(PatientType)
        private patientTypeRepo: Repository<PatientType>
    ) { }


    async findAll() {
        const patientType = await this.patientTypeRepo.find()

        if (!patientType || patientType.length === 0) {
            return {
                success: false,
                status: 404,
                message: 'No record found',
                data: [],
            };
        }

        return {
            data: patientType,
        };
    }
}
