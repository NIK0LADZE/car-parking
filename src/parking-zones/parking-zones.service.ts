import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ParkingZoneDTO } from './parking-zone.dto';
import { ParkingZone } from './parking-zone.model';

@Injectable()
export class ParkingZonesService {
  constructor(
    @InjectModel(ParkingZone)
    private parkingZoneModel: typeof ParkingZone,
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

  async update({
    id,
    title,
    address,
    price,
  }: ParkingZoneDTO): Promise<object | null> {
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

  async delete({ id }: ParkingZoneDTO): Promise<object | null> {
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

  async findByID(id: number): Promise<ParkingZone | null> {
    return await this.parkingZoneModel.findOne({
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
