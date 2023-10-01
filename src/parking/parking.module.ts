import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from 'src/cars/car.model';
import { ParkingZone } from 'src/parking-zones/parking-zone.model';
import { User } from 'src/users/user.model';
import { ParkingController } from './parking.controller';
import { Parking } from './parking.model';
import { ParkingService } from './parking.service';

@Module({
  imports: [SequelizeModule.forFeature([Parking, ParkingZone, User, Car])],
  controllers: [ParkingController],
  providers: [ParkingService],
  exports: [ParkingService],
})
export class ParkingModule {}
