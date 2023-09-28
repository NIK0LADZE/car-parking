import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './car.model';
import { CreateCarDTO } from './CreateCar.dto';
import { UpdateCarDTO } from './UpdateCar.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  create(car: CreateCarDTO, userID: number): Promise<Car> {
    const { title, stateID, type } = car;

    return this.carModel.create({
      userID,
      title,
      stateID,
      type,
    });
  }

  async update(
    { title, stateID, type }: UpdateCarDTO,
    userID: number,
  ): Promise<object | null> {
    const car = await this.findByStateID(stateID, userID);

    if (!car) {
      throw new BadRequestException(
        "This car doesn't exist or you don't have access to it",
      );
    }

    car.update({
      title,
      type,
    });

    return { message: 'Car was updated successfully!' };
  }

  async findByStateID(stateID: string, userID?: number): Promise<Car | null> {
    return await this.carModel.findOne({
      where: {
        stateID,
        ...(userID ? { userID } : {}),
      },
    });
  }
}
