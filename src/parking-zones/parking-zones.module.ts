import { Module } from '@nestjs/common';
import { ParkingZonesService } from './parking-zones.service';
import { ParkingZonesController } from './parking-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParkingZone } from './parking-zone.model';
import { IsUniqueTitleConstraint } from './decorators/IsUniqueTitle.decorator';

@Module({
  imports: [SequelizeModule.forFeature([ParkingZone])],
  controllers: [ParkingZonesController],
  providers: [ParkingZonesService, IsUniqueTitleConstraint],
  exports: [ParkingZonesService],
})
export class ParkingZonesModule {}
