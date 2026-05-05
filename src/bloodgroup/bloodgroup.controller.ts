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

import { BloodgroupService } from './bloodgroup.service';


@Controller('bloodgroup')
export class BloodgroupController {
    constructor(private readonly bloodGroupService: BloodgroupService) { }
    
        @Get()
        findAll() {
            return this.bloodGroupService.findAll()
        }
}
