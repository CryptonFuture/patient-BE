import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BloodGroup } from 'src/entities/bloodGroup.entity';

@Injectable()
export class BloodgroupService {
    constructor(
            @InjectRepository(BloodGroup)
            private bloodGroupRepo: Repository<BloodGroup>
        ) { }
    
    
        async findAll() {
            const bloodGroup = await this.bloodGroupRepo.find()
    
            if (!bloodGroup || bloodGroup.length === 0) {
                return {
                    success: false,
                    status: 404,
                    message: 'No record found',
                    data: [],
                };
            }
    
            return {
                data: bloodGroup,
            };
        }
}
