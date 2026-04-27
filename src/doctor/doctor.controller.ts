import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe, 
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';

import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctor')
export class DoctorController {
     constructor(private readonly doctorService: DoctorService) {}
    
        @Post()
        @UseInterceptors(FileInterceptor('file'))
        async createDoctor(
            @UploadedFile() file: Express.Multer.File,
            @Body() dto: CreateDoctorDto
        ) {
            return await this.doctorService.create(dto, file)
        }
    
        @Get()
        findAll() {
            return this.doctorService.findAll()
        }
    
        @Get(':id')
        findOne(@Param('id', ParseIntPipe) id: number) {
            return this.doctorService.findOne(id)
        }
    
        @Get(':id')
        findById(@Param('id', ParseIntPipe) id: number) {
            return this.doctorService.findById(id)
        }
    
        @Put(':id')
        update(
            @Param('id', ParseIntPipe) id: number,
            @Body() dto: UpdateDoctorDto
        ) {
            return this.doctorService.update(id, dto)
        }
    
        @Delete(':id')
        remove(@Param('id', ParseIntPipe) id: number) {
            return this.doctorService.remove(id)
        }
}
