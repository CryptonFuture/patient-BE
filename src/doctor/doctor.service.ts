import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Patient } from '../entities/patient.entity';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { Doctor } from 'src/entities/doctor.entity';
import { Professional } from 'src/entities/professional.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { System } from 'src/entities/systemFields.entity';

@Injectable()
export class DoctorService {
      constructor(
            // private readonly dataSource: DataSource,
            @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
            @InjectRepository(Professional) private professionalRepo: Repository<Professional>,
            @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
            @InjectRepository(System) private systemRepo: Repository<System>,
        ) { }

        private formatAvailableDays(days: any): string[] {
            if (!days) return [];

            if (Array.isArray(days)) {
                return days;
            }

            if (typeof days === 'string') {
                return days.split(',').map(d => d.trim());
            }

            return [];
        }

          async create(dto: CreateDoctorDto, file: Express.Multer.File) {
                try {

                    
                    const hasEmptyField = Object.values(dto).some(
                        (value) => value === null || value === undefined || value === ''
                    );
        
                    if (hasEmptyField) {
                        throw new BadRequestException('Please fill out all fields');
                    }
        
                    const existingEmail = await this.doctorRepo.findOne({
                        where: { email: dto.email }
                    });
        
                    if (existingEmail) {
                        throw new ConflictException('Email already exists');
                    }
        
                    const existingPhone = await this.doctorRepo.findOne({
                        where: { phone: dto.phone }
                    });
        
                    if (existingPhone) {
                        throw new ConflictException('Phone already exists');
                    }
        
                    // await this.dataSource.transaction(async (pat) => {
        
                        const doctor = this.doctorRepo.create({
                            firstname: dto.firstname,
                            lastname: dto.lastname,
                            gender: dto.gender,
                            dateOfBirth: dto.dateOfBirth,
                            address: dto.address,
                            email: dto.email,
                            phone: dto.phone
                        })
        
                        const savedDoctor = await this.doctorRepo.save(doctor)
        
                        const professional = this.professionalRepo.create({
                            specialization: dto.specialization,
                            department: dto.department,
                            qualification: dto.qualification,
                            experience: dto.experience,
                            licenseNumber: dto.licenseNumber,
                            doctor: savedDoctor
                        });
        
                        await this.professionalRepo.save(professional);
        
                        const schedule = this.scheduleRepo.create({
                            availableDays: Array.isArray(dto.availableDays)
                                ? dto.availableDays
                                : dto.availableDays.split(','),
                            availableTimeStart: dto.availableTimeStart,
                            availableTimeEnd: dto.availableTimeEnd,
                            consultationDuration: dto.consultationDuration,
                            doctor: savedDoctor
                        });
        
                        await this.scheduleRepo.save(schedule);
        
                        const system = this.systemRepo.create({
                            joiningDate: dto.joiningDate,
                            profileImage: file ? `http://localhost:3000/${file.filename}` : undefined,
                            remarks: dto.remarks,
                            doctor: savedDoctor
                        });
        
                        await this.systemRepo.save(system);
        
                       
        
                    const fullDoctor = await this.doctorRepo.findOne({
                        where: { id: savedDoctor.id },
                        relations: ['professional', 'schedule', 'system']
                    });
        
                    return {
                        success: true,
                        status: 200,
                        message: 'Doctor created successfully',
                        data: fullDoctor
                        
                    }
        
                } catch (error) {
                    console.error(error);
        
                    if (
                        error instanceof BadRequestException ||
                        error instanceof ConflictException
                    ) {
                        throw error;
                    }
        
                    throw new InternalServerErrorException('Something went wrong');
                }
        
            }
        
        
        
            async findAll() {
                const doctors = await this.doctorRepo
                    .createQueryBuilder('doctor')
                    .leftJoinAndSelect('doctor.professional', 'professional')
                    .leftJoinAndSelect('doctor.schedule', 'schedule')
                    .leftJoinAndSelect('doctor.system', 'system')
                    .getMany();
        
                if (!doctors || doctors.length === 0) {
                    return {
                        success: false,
                        status: 404,
                        message: 'No record found',
                        data: [],
                    };
                }
        
                return {
                    data: doctors,
                };
            }
        
            async findOne(id: number): Promise<Doctor> {
                const doctors = await this.doctorRepo
                    .createQueryBuilder('doctor')
                    .leftJoinAndSelect('doctor.professional', 'professional')
                    .leftJoinAndSelect('doctor.schedule', 'schedule')
                    .leftJoinAndSelect('doctor.system', 'system')
                    .where('doctor.id = :id', { id })
                    .getOne();
                if (!doctors) throw new NotFoundException('Doctor not found');
                return doctors;
            }
        
            async findById(id: number): Promise<Doctor> {
                const doctors = await this.doctorRepo
                     .createQueryBuilder('doctor')
                    .leftJoinAndSelect('doctor.professional', 'professional')
                    .leftJoinAndSelect('doctor.schedule', 'schedule')
                    .leftJoinAndSelect('doctor.system', 'system')
                    .where('doctor.id = :id', { id })
                    .getOne();
                if (!doctors) throw new NotFoundException('Doctor not found');
                return doctors;
            }
        
            async update(id: number, dto: any) {
                try {
                    //  const hasEmptyField = Object.values(dto).some(
                    //     (value) => value === null || value === undefined || value === ''
                    // );
        
                    // if (hasEmptyField) {
                    //     throw new BadRequestException('Please fill out all fields');
                    // }
        
            
                    const doctor = await this.doctorRepo.findOne({
                        where: {id},
                        relations: ['professional', 'schedule', 'system']
                    })
        
                    if (!doctor) {
                        throw new NotFoundException('Doctor not found');
                    }
                    Object.assign(doctor, {
                        firstname: dto.firstname,
                        lastname: dto.lastname,
                        gender: dto.gender,
                        dateOfBirth: dto.dateOfBirth,
                        address: dto.address,
                        email: dto.email,
                        phone: dto.phone
                    });
                    
                    if (dto.professional) {
                        Object.assign(doctor.professional, dto.professional);
                    }
        
                    if (dto.schedule) {
                        Object.assign(doctor.schedule, dto.schedule);
                    }
        
                    if (dto.system) {
                        Object.assign(doctor.system, dto.system);
                    }
        
        
                    await this.doctorRepo.save(doctor);
        
                    const updatedDoctor = await this.doctorRepo.findOne({
                        where: { id },
                        relations: ['professional', 'schedule', 'system']
                    });
        
        
                    return {
                        success: true,
                        status: 200,
                        message: 'Doctor Updated Successfully',
                        data: updatedDoctor
                    }
        
                } catch (error) {
                    console.error(error);
        
                    if (
                        error instanceof BadRequestException ||
                        error instanceof ConflictException
                    ) {
                        throw error;
                    }
        
                    throw new InternalServerErrorException('Something went wrong');
                }
        
        
            }
        
            async remove(id: number): Promise<{ message: string }> {
                const doctors = await this.findOne(id)
                await this.doctorRepo.remove(doctors)
                return { message: 'Doctor Deleted Successfully' };
            }
}
