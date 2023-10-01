import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarDTO } from './car.dto';
import { Car } from './car.model';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  async create(car: CarDTO, userID: number): Promise<object | null> {
    const { title, stateID, type } = car;

    await this.carModel.create({
      userID,
      title,
      stateID,
      type,
    });

    return { message: 'Car was added successfully!' };
  }

  async update(
    { title, stateID, type }: CarDTO,
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

  async delete({ stateID }: CarDTO, userID: number): Promise<object | null> {
    const wasDeleted = await this.carModel.destroy({
      where: {
        stateID,
        userID,
      },
    });

    if (!wasDeleted) {
      throw new BadRequestException(
        "This car doesn't exist or you don't have access to it",
      );
    }

    return { message: 'Car was deleted successfully!' };
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
