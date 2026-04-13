import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity'
import { Patient } from './entities/patient.entity'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [User, Patient],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
    subscribers: []
})