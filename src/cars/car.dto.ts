import {
  IsNotEmpty,
  //   IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CarInterface } from './Car.interface';
import { IsStateIDUnique } from './decorators/IsStateIDUnique.decorator';

export class CarDTO implements CarInterface {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsStateIDUnique()
  stateID: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
