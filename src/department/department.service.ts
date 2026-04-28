import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Department } from 'src/entities/department.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>
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
