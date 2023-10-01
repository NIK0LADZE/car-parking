import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ParkingZonesService } from '../parking-zones.service';

export const IsUniqueTitle = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueTitleConstraint,
    });
  };
};

@ValidatorConstraint({ async: true })
export class IsUniqueTitleConstraint implements ValidatorConstraintInterface {
  constructor(private readonly parkingZoneService: ParkingZonesService) {}

  async validate(title: string = ''): Promise<boolean> {
    return this.parkingZoneService
      .findByTitle(title)
      .then((foundParkingZone) => !foundParkingZone);
  }

  defaultMessage(): string {
    return 'Parking zone with this title already exists';
  }
}
