import { BaseCarDTO } from './BaseCar.dto';
import { CarInterface } from './Car.interface';
import { IsStateIDUnique } from './decorators/IsStateIDUnique.decorator';

export class CreateCarDTO extends BaseCarDTO implements CarInterface {
  @IsStateIDUnique()
  stateID: string;
}
