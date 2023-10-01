import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsUniqueTitle } from './decorators/IsUniqueTitle.decorator';
import { ParkingZoneInterface } from './parking-zone.interface';

export enum ParkingZoneValidationGroups {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class ParkingZoneDTO implements ParkingZoneInterface {
  @IsDefined({
    groups: [
      ParkingZoneValidationGroups.UPDATE,
      ParkingZoneValidationGroups.DELETE,
    ],
  })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 0 },
    {
      groups: [
        ParkingZoneValidationGroups.UPDATE,
        ParkingZoneValidationGroups.DELETE,
      ],
    },
  )
  id: number;

  @IsOptional({ groups: [ParkingZoneValidationGroups.UPDATE] })
  @IsString({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  @IsNotEmpty({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  @IsUniqueTitle({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  title: string;

  @IsOptional({ groups: [ParkingZoneValidationGroups.UPDATE] })
  @IsString({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  @IsNotEmpty({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  address: string;

  @IsOptional({ groups: [ParkingZoneValidationGroups.UPDATE] })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 2 },
    {
      groups: [
        ParkingZoneValidationGroups.CREATE,
        ParkingZoneValidationGroups.UPDATE,
      ],
    },
  )
  @IsNotEmpty({
    groups: [
      ParkingZoneValidationGroups.CREATE,
      ParkingZoneValidationGroups.UPDATE,
    ],
  })
  price: number;
}
