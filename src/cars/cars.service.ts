import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarDTO } from './car.dto';
import { Car } from './car.model';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  create(car: CarDTO, userID: number): Promise<Car> {
    const { title, stateID, type } = car;

    return this.carModel.create({
      userID,
      title,
      stateID,
      type,
    });
  }

  async findByStateID(stateID: string): Promise<Car | null> {
    return await this.carModel.findOne({
      where: {
        stateID,
      },
    });
  }
}
