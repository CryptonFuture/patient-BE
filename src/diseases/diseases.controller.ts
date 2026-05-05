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

import { DiseasesService } from './diseases.service';

@Controller('diseases')
export class DiseasesController {
    constructor(private readonly diseasesService: DiseasesService) { }

    @Get()
    findAll() {
        return this.diseasesService.findAll()
    }
}
