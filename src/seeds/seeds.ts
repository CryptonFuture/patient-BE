import { DataSource } from 'typeorm'
import { GenderSeed } from './gender.seed'
import { Gender } from '../entities/gender.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgresql',
    database: 'patientdb',
    entities: [Gender],
    synchronize: false,
});

async function runSeed() {
    await AppDataSource.initialize()

     console.log('🌱 Seeding started...');

     await GenderSeed(AppDataSource)

     console.log('🌱 Seeding completed!');
     process.exit(0)
}

runSeed()