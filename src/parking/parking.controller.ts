import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ParkingZoneValidationGroups } from 'src/parking-zones/parking-zone.dto';
import { ValidationPipeWithGlobalOptions } from 'src/pipes/validation-with-global-options.pipe';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';
import { RolesGuard } from 'src/users/roles/roles.guard';
import { ParkingDTO } from './parking.dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.READ],
    }),
  )
  async getMyParkings(
    @Body() parking: ParkingDTO,
    @Request() { user: { userID } },
  ) {
    return await this.parkingService.getMyRecords(userID, parking);
  }

  @Post('start')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.CREATE],
    }),
  )
  async parkTheCar(
    @Body() parking: ParkingDTO,
    @Request() { user: { userID } },
  ) {
    return await this.parkingService.start(userID, parking);
  }

  @Post('stop/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [ParkingZoneValidationGroups.CREATE],
    }),
  )
  async takeTheCar(@Param() { id }: any, @Request() { user: { userID } }) {
    return await this.parkingService.stop(id, userID);
  }
}
