import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesController } from './diseases.controller';
import { Diseases } from 'src/entities/diseases.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diseases])],
  providers: [DiseasesService],
  controllers: [DiseasesController]
})
export class DiseasesModule {}
