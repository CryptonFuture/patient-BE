import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Country } from 'src/entities/country.entity';
import { City } from 'src/entities/city.entity';
import { State } from 'src/entities/state.entity';
import { Zipcode } from 'src/entities/zipcode.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City, State, Zipcode])],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
