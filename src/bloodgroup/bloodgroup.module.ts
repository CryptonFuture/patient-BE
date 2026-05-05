import { Module } from '@nestjs/common';
import { BloodgroupService } from './bloodgroup.service';
import { BloodgroupController } from './bloodgroup.controller';
import { BloodGroup } from 'src/entities/bloodGroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BloodGroup])],
  providers: [BloodgroupService],
  controllers: [BloodgroupController]
})
export class BloodgroupModule {}
