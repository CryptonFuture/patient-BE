import { DataSource } from 'typeorm'
import { GenderSeed } from './gender.seed'
import { Gender } from '../entities/gender.entity';
import { Department } from '../entities/department.entity';
import { DepartmentSeed } from './department.seed';
import { PatientTypeSeed } from './patient-type.seed';
import { PatientType } from '../entities/patientType.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [Gender, Department, PatientType],
    synchronize: false,
});

async function runSeed() {
    await AppDataSource.initialize()

     console.log('🌱 Seeding started...');

     await GenderSeed(AppDataSource)
     await DepartmentSeed(AppDataSource)
     await PatientTypeSeed(AppDataSource)

     console.log('🌱 Seeding completed!');
     process.exit(0)
}

runSeed()