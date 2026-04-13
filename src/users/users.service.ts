import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../entities/user.entity'
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async create(dto: CreateUserDto) {
        const user = this.userRepo.create(dto)
        await this.userRepo.save(user)

        return {
            success: true,
            status: 200,
            message: 'User created successfully',
        }
    }

    async findAll() {
        const users = await this.userRepo.find()

        if (!users || users.length === 0) {
            return {
                success: false,
                status: 404,
                message: 'No record found',
                data: [],
            };
        }

        return {
            data: users,
        };

    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({where: {id}})
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id)
        Object.assign(user, dto)
        return this.userRepo.save(user)
    }

    async remove(id: number): Promise<{ message: string }> {
        const user = await this.findOne(id)
        await this.userRepo.remove(user)
        return { message: 'User deleted successfully' };
    }

}
