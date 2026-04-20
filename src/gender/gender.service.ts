import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Gender } from 'src/entities/gender.entity';

@Injectable()
export class GenderService {
     constructor(
            @InjectRepository(Gender)
            private genderRepo: Repository<Gender>
        ) {}

    async findAll() {
        const genders = await this.genderRepo.find()

         if (!genders || genders.length === 0) {
            return {
                success: false,
                status: 404,
                message: 'No record found',
                data: [],
            };
        }

        return {
            data: genders,
        };
    }
}
