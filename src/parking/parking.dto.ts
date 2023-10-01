import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ParkingZoneValidationGroups } from 'src/parking-zones/parking-zone.dto';
import { ParkingInterface } from './parking.interface';

export class ParkingDTO implements ParkingInterface {
  @IsDefined({ always: true })
  @IsNumber({ allowNaN: false }, { always: true })
  @IsNotEmpty({ always: true })
  carID: number;

  @IsDefined({ always: true })
  @IsNumber({ allowNaN: false }, { always: true })
  @IsNotEmpty({ always: true })
  parkingZoneID: number;

  @IsOptional({ groups: [ParkingZoneValidationGroups.READ] })
  @IsString({
    groups: [ParkingZoneValidationGroups.READ],
  })
  @IsNotEmpty({
    groups: [ParkingZoneValidationGroups.READ],
  })
  status: 'active' | 'expired' | 'rejected';
}
