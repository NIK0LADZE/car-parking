import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipeWithGlobalOptions } from 'src/pipes/validation-with-global-options.pipe';
import {
  ParkingZoneDTO,
  ParkingZoneValidationGroups,
} from './parking-zone.dto';
import { ParkingZonesService } from './parking-zones.service';

@Controller('parking-zones')
export class ParkingZonesController {
  constructor(private readonly parkingZoneService: ParkingZonesService) {}

  @Post()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.CREATE],
    }),
  )
  async createParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.create(parkingZone);
  }

  @Post('all')
  async getAllZones() {
    return await this.parkingZoneService.getAll();
  }

  @Patch()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.UPDATE],
    }),
  )
  async updateParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.update(parkingZone);
  }

  @Delete()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.DELETE],
    }),
  )
  async deleteParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.delete(parkingZone);
  }
}
