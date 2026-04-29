import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe 
} from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    
     constructor(private readonly locService: LocationService) {}

    @Get('countries')
    getCountries() {
        return this.locService.getCountries()
    }

    @Get('states/:country_id')
    getStates(@Param('country_id', ParseIntPipe) country_id: any) {
        return this.locService.getStates(country_id)
    }

    @Get('cities/:state_id')
    getCities(@Param('state_id', ParseIntPipe) state_id: any) {
        return this.locService.getCities(state_id)
    }

    @Get('zipcodes/:city_id')
    getZipcodes(@Param('city_id', ParseIntPipe) city_id: any) {
        return this.locService.getZipcodes(city_id)
    }
}
