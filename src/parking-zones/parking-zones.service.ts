import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from 'src/cars/car.model';
import { Parking } from 'src/parking/parking.model';
import { User } from 'src/users/user.model';
import { ParkingZoneDTO } from './parking-zone.dto';
import { ParkingZone } from './parking-zone.model';

@Injectable()
export class ParkingZonesService {
  constructor(
    @InjectModel(ParkingZone)
    private parkingZoneModel: typeof ParkingZone,
    @InjectModel(Parking)
    private parkingModel: typeof Parking,
  ) {}

  async create(car: ParkingZoneDTO): Promise<object | null> {
    const { title, address, price } = car;

    await this.parkingZoneModel.create({
      title,
      address,
      price,
    });

    return { message: 'Parking zone was added successfully!' };
  }

  async update(
    id: number,
    { title, address, price }: ParkingZoneDTO,
  ): Promise<object | null> {
    const car = await this.findByID(id);

    if (!car) {
      throw new BadRequestException("This parking zone doesn't exist");
    }

    car.update({
      title,
      address,
      price,
    });

    return { message: 'Parking zone was updated successfully!' };
  }

  async delete(id: number): Promise<object | null> {
    const wasDeleted = await this.parkingZoneModel.destroy({
      where: {
        id,
      },
    });

    if (!wasDeleted) {
      throw new BadRequestException("This parking zone doesn't exist");
    }

    return { message: 'Parking zone was deleted successfully!' };
  }

  async getAll(): Promise<ParkingZone[]> {
    return await this.parkingZoneModel.findAll({
      attributes: ['id', 'title', 'address', 'price'],
    });
  }

  async getParkingZoneRecords(
    parkingZoneID: number,
    { status }: ParkingZoneDTO,
  ): Promise<Parking | any> {
    const parking = await this.parkingModel.findAll({
      attributes: ['id', 'status', 'startingTime', 'endingTime', 'totalAmount'],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'balance', 'role'],
        },
        {
          model: Car,
          attributes: ['id', 'title', 'stateID', 'type'],
        },
        {
          model: ParkingZone,
          attributes: ['id', 'title', 'address', 'price'],
        },
      ],
      where: {
        parkingZoneID,
        ...(status ? { status } : {}),
      },
    });

    if (parking.length === 0) {
      return { message: 'No parking found' };
    }

    return parking;
  }

  async findByID(id: number): Promise<ParkingZone | null> {
    return await this.parkingZoneModel.findOne({
      attributes: ['id', 'title', 'address', 'price'],
      where: {
        id,
      },
    });
  }

  async findByTitle(title: string): Promise<ParkingZone | null> {
    return await this.parkingZoneModel.findOne({
      where: {
        title,
      },
    });
  }

  async findByAddress(address: string): Promise<ParkingZone | null> {
    return await this.parkingZoneModel.findOne({
      where: {
        address,
      },
    });
  }
}
