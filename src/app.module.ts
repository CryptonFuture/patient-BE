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
import { Professional } from './entities/professional.entity';
import { System } from './entities/systemFields.entity';
import { Doctor } from './entities/doctor.entity';
import { Schedule } from './entities/schedule.entity';
import { Department } from './entities/department.entity'
import { DoctorModule } from './doctor/doctor.module';
import { DepartmentModule } from './department/department.module';
import { LocationModule } from './location/location.module';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { Zipcode } from './entities/zipcode.entity';
import { PatientTypeModule } from './patient-type/patient-type.module';
import { PatientType } from './entities/patientType.entity';
import { BloodgroupModule } from './bloodgroup/bloodgroup.module';
import { BloodGroup } from './entities/bloodGroup.entity';
import { DiseasesModule } from './diseases/diseases.module';
import { Diseases } from './entities/diseases.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database: 'patientdb',
      entities: [
        User, 
        Patient, 
        Gender, 
        Contact, 
        Medical, 
        Emergency, 
        Register, 
        Professional, 
        System, 
        Doctor, 
        Schedule, 
        Department,
        Country,
        City,
        State,
        Zipcode,
        PatientType,
        BloodGroup,
        Diseases
      ],
      autoLoadEntities: true,
      synchronize: false
    }),
    UsersModule,
    PatientsModule,
    GenderModule,
    DoctorModule,
    DepartmentModule,
    LocationModule,
    PatientTypeModule,
    BloodgroupModule,
    DiseasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
