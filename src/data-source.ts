import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Patient } from './entities/patient.entity'
import { Gender } from './entities/gender.entity'
import { Contact } from './entities/contact.entity'
import { Medical } from './entities/medical.entity'
import { Register } from './entities/register.entity'
import { Emergency } from './entities/emergency.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [User, Patient, Gender, Contact, Medical, Register, Emergency],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
    subscribers: []
})