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

    @Get('states/:countryId')
    getStates(@Param('countryId') id: number) {
        return this.locService.getStates(+id)
    }

    @Get('cities/:stateId')
    getCities(@Param('stateId') id: number) {
        return this.locService.getCities(+id)
    }

    @Get('zipcodes/:cityId')
    getZipcodes(@Param('cityId') id: number) {
        return this.locService.getZipcodes(+id)
    }
}
