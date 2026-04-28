import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { City } from 'src/entities/city.entity';
import { Country } from 'src/entities/country.entity';
import { State } from 'src/entities/state.entity';
import { Zipcode } from 'src/entities/zipcode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
    @InjectRepository(Country) private countryRepo: Repository<Country>
    @InjectRepository(State) private stateRepo: Repository<State>
    @InjectRepository(City) private cityRepo: Repository<City>
    @InjectRepository(Zipcode) private zipcodeRepo: Repository<Zipcode>


    getCountries() {
        return this.countryRepo.find()
    }

    getStates(countryId: number) {
        return this.stateRepo.find({
            where: { country: { id: countryId } }
        })
    }

    getCities(stateId: number) {
        return this.cityRepo.find({
            where: { state: { id: stateId } }
        })
    }

     getZipcodes(cityId: number) {
        return this.zipcodeRepo.find({
            where: { city: { id: cityId } }
        })
    }
}
