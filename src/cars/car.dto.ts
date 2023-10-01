import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CarInterface } from './Car.interface';
import { IsStateIDUnique } from './decorators/IsStateIDUnique.decorator';

export enum CarValidationGroups {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class CarDTO implements CarInterface {
  @IsOptional({ groups: [CarValidationGroups.UPDATE] })
  @IsString({
    groups: [CarValidationGroups.CREATE, CarValidationGroups.UPDATE],
  })
  @IsNotEmpty({
    groups: [CarValidationGroups.CREATE, CarValidationGroups.UPDATE],
  })
  title: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @IsStateIDUnique({ groups: [CarValidationGroups.CREATE] })
  stateID: string;

  @IsOptional({ groups: [CarValidationGroups.UPDATE] })
  @IsString({
    groups: [CarValidationGroups.CREATE, CarValidationGroups.UPDATE],
  })
  @IsNotEmpty({
    groups: [CarValidationGroups.CREATE, CarValidationGroups.UPDATE],
  })
  type: string;
}
