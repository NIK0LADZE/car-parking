import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CarsService } from '../cars.service';

export const IsStateIDUnique = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStateIDUniqueConstraint,
    });
  };
};

@ValidatorConstraint({ async: true })
export class IsStateIDUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly carsService: CarsService) {}

  async validate(stateID: string = ''): Promise<boolean> {
    return this.carsService
      .findByStateID(stateID)
      .then((foundCar) => !foundCar);
  }

  defaultMessage(): string {
    return 'Car with this state ID already exists';
  }
}
