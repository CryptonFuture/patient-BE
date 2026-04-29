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
        return this.countryRepo.find({
             select: {
                id: true,
                name: true,
                code: true
            }
        })
    }

    getStates(country_id: any) {
        return this.stateRepo.find({
            where: { country: { id: country_id } },
            relations: ['country'],
            select: {
                id: true,
                name: true,
                country: {
                    id: true
                }
            }
        }).then(states => 
            states.map(s => ({
                id: s.id,
                name: s.name,
                country_id: s.country.id
            }))
        )
    }

    getCities(state_id: any) {
        return this.cityRepo.find({
            where: { state: { id: state_id } },
            relations: ['state'],
            select: {
                id: true,
                name: true,
                state: {
                    id: true
                }
            }
        }).then(cities => 
            cities.map(s => ({
                id: s.id,
                name: s.name,
                state_id: s.state.id
            }))
        )
    }

     getZipcodes(city_id: any) {
        return this.zipcodeRepo.find({
            where: { city: { id: city_id } },
            relations: ['city'],
            select: {
                id: true,
                code: true,
                city: {
                    id: true
                }
            }
        }).then(zipcodes => 
            zipcodes.map(s => ({
                id: s.id,
                name: s.code,
                city_id: s.city.id
            }))
        )
    }
}
