import { DataSource } from 'typeorm'
import { GenderSeed } from './gender.seed'
import { Gender } from '../entities/gender.entity';
import { Department } from '../entities/department.entity';
import { DepartmentSeed } from './department.seed';
import { PatientTypeSeed } from './patient-type.seed';
import { PatientType } from '../entities/patientType.entity';
import { BloodGroupSeed } from './bloodGroup.seed';
import { BloodGroup } from '../entities/bloodGroup.entity';
import { DiseasesSeed } from './diseases.seed';
import { Diseases } from '../entities/diseases.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [Gender, Department, PatientType, BloodGroup, Diseases],
    synchronize: false,
});

async function runSeed() {
    await AppDataSource.initialize()

     console.log('🌱 Seeding started...');

     await GenderSeed(AppDataSource)
     await DepartmentSeed(AppDataSource)
     await PatientTypeSeed(AppDataSource)
     await BloodGroupSeed(AppDataSource)
     await DiseasesSeed(AppDataSource)

     console.log('🌱 Seeding completed!');
     process.exit(0)
}

runSeed()