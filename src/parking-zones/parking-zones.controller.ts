import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipeWithGlobalOptions } from 'src/pipes/validation-with-global-options.pipe';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';
import { RolesGuard } from 'src/users/roles/roles.guard';
import {
  ParkingZoneDTO,
  ParkingZoneValidationGroups,
} from './parking-zone.dto';
import { ParkingZonesService } from './parking-zones.service';

@Controller('parking-zones')
export class ParkingZonesController {
  constructor(private readonly parkingZoneService: ParkingZonesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.CREATE],
    }),
  )
  async createParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.create(parkingZone);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getAllZones() {
    return await this.parkingZoneService.getAll();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.UPDATE],
    }),
  )
  async updateParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.update(parkingZone);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.DELETE],
    }),
  )
  async deleteParkingZone(@Body() parkingZone: ParkingZoneDTO) {
    return await this.parkingZoneService.delete(parkingZone);
  }
}
