import { IsOptional } from 'class-validator';
import { BaseCarDTO } from './BaseCar.dto';
import { CarInterface } from './Car.interface';

export class UpdateOrDeleteCarDTO extends BaseCarDTO implements CarInterface {
  @IsOptional()
  title: string;

  @IsOptional()
  type: string;
}
