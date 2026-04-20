import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { User } from './entities/user.entity';
import { Patient } from './entities/patient.entity';
import { Gender } from './entities/gender.entity';
import { GenderModule } from './gender/gender.module';
import { Contact } from './entities/contact.entity';
import { Medical } from './entities/medical.entity';
import { Emergency } from './entities/emergency.entity';
import { Register } from './entities/register.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database: 'patientdb',
      entities: [User, Patient, Gender, Contact, Medical, Emergency, Register],
      autoLoadEntities: true,
      synchronize: false
    }),
    UsersModule,
    PatientsModule,
    GenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
