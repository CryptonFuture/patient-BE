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

import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
    constructor(private readonly genderService: GenderService) {}

    @Get()
    findAll() {
        return this.genderService.findAll()
    }

}
