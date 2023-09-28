import { IsNotEmpty, IsString } from 'class-validator';
import { CarInterface } from './Car.interface';

export class BaseCarDTO implements CarInterface {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  stateID: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
