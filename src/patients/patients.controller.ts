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

import { PatientsService } from './patients.service';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientService: PatientsService) {}

    @Post()
    create(@Body() dto: CreatePatientDto) {
        return this.patientService.create(dto)
    }

    @Get()
    findAll() {
        return this.patientService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.findOne(id)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePatientDto
    ) {
        return this.patientService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.remove(id)
    }
}
