import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';
// import { DataSource } from 'typeorm/browser';
import { Medical } from 'src/entities/medical.entity';
import { Emergency } from 'src/entities/emergency.entity';
import { Register } from 'src/entities/register.entity';
import { Contact } from 'src/entities/contact.entity';

@Injectable()
export class PatientsService {
    constructor(
        // private readonly dataSource: DataSource,
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        @InjectRepository(Contact) private contactRepo: Repository<Contact>,
        @InjectRepository(Medical) private medicalRepo: Repository<Medical>,
        @InjectRepository(Emergency) private emergencyRepo: Repository<Emergency>,
        @InjectRepository(Register) private registerRepo: Repository<Register>
    ) { }

    async create(dto: CreatePatientDto) {
        try {
            const hasEmptyField = Object.values(dto).some(
                (value) => value === null || value === undefined || value === ''
            );

            if (hasEmptyField) {
                throw new BadRequestException('Please fill out all fields');
            }

            const existingCnic = await this.patientRepo.findOne({
                where: { cnic: dto.cnic }
            });

            if (existingCnic) {
                throw new ConflictException('CNIC already exists');
            }

            const existingEmail = await this.contactRepo.findOne({
                where: { email: dto.email }
            });

            if (existingEmail) {
                throw new ConflictException('Email already exists');
            }

            const existingPhone = await this.contactRepo.findOne({
                where: { phone: dto.phone }
            });

            if (existingPhone) {
                throw new ConflictException('Phone already exists');
            }

            // await this.dataSource.transaction(async (pat) => {

                const patient = this.patientRepo.create({
                    firstname: dto.firstname,
                    lastname: dto.lastname,
                    gender: dto.gender,
                    dateOfBirth: dto.dateOfBirth,
                    cnic: dto.cnic,
                    age: dto.age
                })

                const savedPatient = await this.patientRepo.save(patient)

                const contact = this.contactRepo.create({
                    phone: dto.phone,
                    alternatePhone: dto.alternatePhone,
                    city: dto.city,
                    country: dto.country,
                    email: dto.email,
                    address: dto.address,
                    patient: savedPatient
                });

                await this.contactRepo.save(contact);

                const medical = this.medicalRepo.create({
                    bloodGroup: dto.bloodGroup,
                    height: dto.height,
                    weight: dto.weight,
                    allergies: dto.allergies,
                    diseases: dto.diseases,
                    medications: dto.medications,
                    patient: savedPatient
                });

                await this.medicalRepo.save(medical);

                const emergency = this.emergencyRepo.create({
                    emergencyName: dto.emergencyName,
                    emergencyNumber: dto.emergencyNumber,
                    insuranceProvider: dto.insuranceProvider,
                    maritalStatus: dto.maritalStatus,
                    occupation: dto.occupation,
                    patient: savedPatient
                });

                await this.emergencyRepo.save(emergency);

                const registration = this.registerRepo.create({
                    patientType: dto.patientType,
                    department: dto.department,
                    assignedDoctor: dto.assignedDoctor,
                    registerDate: dto.registerDate,
                    patient: savedPatient
                });

               await this.registerRepo.save(registration);

            const fullPatient = await this.patientRepo.findOne({
                where: { id: savedPatient.id },
                relations: ['contact', 'medical', 'emergency', 'registration']
            });

            return {
                success: true,
                status: 200,
                message: 'Patient created successfully',
                data: fullPatient
                
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
        const patients = await this.patientRepo
            .createQueryBuilder('patient')
            .leftJoinAndSelect('patient.contact', 'contact')
            .leftJoinAndSelect('patient.medical', 'medical')
            .leftJoinAndSelect('patient.emergency', 'emergency')
            .leftJoinAndSelect('patient.registration', 'registration')
            .getMany();

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
        const patients = await this.patientRepo
            .createQueryBuilder('patient')
            .leftJoinAndSelect('patient.contact', 'contact')
            .leftJoinAndSelect('patient.medical', 'medical')
            .leftJoinAndSelect('patient.emergency', 'emergency')
            .leftJoinAndSelect('patient.registration', 'registration')
            .where('patient.id = :id', { id })
            .getOne();
        if (!patients) throw new NotFoundException('User not found');
        return patients;
    }

    async findById(id: number): Promise<Patient> {
        const patients = await this.patientRepo
            .createQueryBuilder('patient')
            .leftJoinAndSelect('patient.contact', 'contact')
            .leftJoinAndSelect('patient.medical', 'medical')
            .leftJoinAndSelect('patient.emergency', 'emergency')
            .leftJoinAndSelect('patient.registration', 'registration')
            .where('patient.id = :id', { id })
            .getOne();
        if (!patients) throw new NotFoundException('User not found');
        return patients;
    }

    async update(id: number, dto: any) {
        try {
            //  const hasEmptyField = Object.values(dto).some(
            //     (value) => value === null || value === undefined || value === ''
            // );

            // if (hasEmptyField) {
            //     throw new BadRequestException('Please fill out all fields');
            // }

    
            const patient = await this.patientRepo.findOne({
                where: {id},
                relations: ['contact', 'medical', 'emergency', 'registration']
            })

            if (!patient) {
                throw new NotFoundException('Patient not found');
            }
            Object.assign(patient, {
                firstname: dto.firstname,
                lastname: dto.lastname,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth,
                cnic: dto.cnic,
                age: dto.age,
                status: dto.status
            });
            
            if (dto.contact) {
                Object.assign(patient.contact, dto.contact);
            }

            if (dto.medical) {
                Object.assign(patient.medical, dto.medical);
            }

            if (dto.emergency) {
                Object.assign(patient.emergency, dto.emergency);
            }

            if (dto.registration) {
                Object.assign(patient.registration, dto.registration);
            }

            await this.patientRepo.save(patient);

            const updatedPatient = await this.patientRepo.findOne({
                where: { id },
                relations: ['contact', 'medical', 'emergency', 'registration']
            });


            return {
                success: true,
                status: 200,
                message: 'Patient Updated Successfully',
                data: updatedPatient
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
        const patients = await this.findOne(id)
        await this.patientRepo.remove(patients)
        return { message: 'Patient Deleted Successfully' };
    }

}
