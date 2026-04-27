import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Patient } from './entities/patient.entity'
import { Gender } from './entities/gender.entity'
import { Contact } from './entities/contact.entity'
import { Medical } from './entities/medical.entity'
import { Register } from './entities/register.entity'
import { Emergency } from './entities/emergency.entity'
import { Professional } from './entities/professional.entity'
import { System } from './entities/systemFields.entity'
import { Schedule } from './entities/schedule.entity'
import { Doctor } from './entities/doctor.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [User, Patient, Gender, Contact, Medical, Register, Emergency, Professional, System, Schedule, Doctor],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
    subscribers: []
})