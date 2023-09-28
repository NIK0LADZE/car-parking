import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './car.model';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { IsStateIDUniqueConstraint } from './decorators/IsStateIDUnique.decorator';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService, IsStateIDUniqueConstraint],
  exports: [CarsService],
})
export class CarsModule {}
