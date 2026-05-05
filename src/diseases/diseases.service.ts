import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Diseases } from 'src/entities/diseases.entity';

@Injectable()
export class DiseasesService {
     constructor(
            @InjectRepository(Diseases)
            private departmentRepo: Repository<Diseases>
        ) { }
    
        async findAll() {
            const department = await this.departmentRepo.find()
    
            if (!department || department.length === 0) {
                return {
                    success: false,
                    status: 404,
                    message: 'No record found',
                    data: [],
                };
            }
    
            return {
                data: department,
            };
        }
}
