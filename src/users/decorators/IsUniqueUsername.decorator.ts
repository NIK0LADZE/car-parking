import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

export const IsUniqueUsername = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueUsernameConstraint,
    });
  };
};

@ValidatorConstraint({ async: true })
export class IsUniqueUsernameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string = ''): Promise<boolean> {
    return this.usersService
      .findByUsername(username)
      .then((foundUser) => !foundUser);
  }
}
