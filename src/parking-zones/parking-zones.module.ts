import { Module } from '@nestjs/common';
import { ParkingZonesService } from './parking-zones.service';
import { ParkingZonesController } from './parking-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParkingZone } from './parking-zone.model';
import { IsUniqueTitleConstraint } from './decorators/IsUniqueTitle.decorator';
import { Parking } from 'src/parking/parking.model';

@Module({
  imports: [SequelizeModule.forFeature([ParkingZone, Parking])],
  controllers: [ParkingZonesController],
  providers: [ParkingZonesService, IsUniqueTitleConstraint],
  exports: [ParkingZonesService],
})
export class ParkingZonesModule {}
