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

import { PatientTypeService } from './patient-type.service';

@Controller('patient-type')
export class PatientTypeController {
    constructor(private readonly patientTypeService: PatientTypeService) { }

    @Get()
    findAll() {
        return this.patientTypeService.findAll()
    }
}
