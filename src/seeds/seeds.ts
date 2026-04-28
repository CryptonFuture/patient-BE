import { DataSource } from 'typeorm'
import { GenderSeed } from './gender.seed'
import { Gender } from '../entities/gender.entity';
import { Department } from '../entities/department.entity';
import { DepartmentSeed } from './department.seed';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [Gender, Department],
    synchronize: false,
});

async function runSeed() {
    await AppDataSource.initialize()

     console.log('🌱 Seeding started...');

     await GenderSeed(AppDataSource)
     await DepartmentSeed(AppDataSource)

     console.log('🌱 Seeding completed!');
     process.exit(0)
}

runSeed()