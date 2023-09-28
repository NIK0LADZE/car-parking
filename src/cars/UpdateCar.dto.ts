import { IsOptional } from 'class-validator';
import { BaseCarDTO } from './baseCar.dto';
import { CarInterface } from './Car.interface';

export class UpdateCarDTO extends BaseCarDTO implements CarInterface {
  @IsOptional()
  title: string;

  @IsOptional()
  type: string;
}
