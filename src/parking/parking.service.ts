import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from 'src/cars/car.model';
import { ParkingZone } from 'src/parking-zones/parking-zone.model';
import { User } from 'src/users/user.model';
import { ParkingDTO } from './parking.dto';
import { Parking } from './parking.model';

// Price to pay per interval(in minutes)
// i.e if it's 60 total will be calculated hourly
// You can change it for testing purposes
const PER_INTERVAL = 60;

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel(Parking)
    private parkingModel: typeof Parking,
    @InjectModel(ParkingZone)
    private parkingZoneModel: typeof ParkingZone,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  async start(userID: number, parking: ParkingDTO): Promise<object | null> {
    const { carID, parkingZoneID } = parking;

    const car = await this.carModel.findOne({
      where: {
        id: carID,
        userID,
      },
    });

    if (!car) {
      throw new BadRequestException("This car doesn't belong to you");
    }

    const { id } = await this.parkingModel.create({
      userID,
      carID,
      parkingZoneID,
      status: 'active',
      startingTime: new Date(),
    });

    return { message: `Car was parked successfully, order ID: ${id}` };
  }

  async getMyRecords(
    userID: number,
    { status }: ParkingDTO,
  ): Promise<Parking | any> {
    const parking = await this.parkingModel.findAll({
      attributes: ['id', 'status', 'startingTime', 'endingTime', 'totalAmount'],
      include: [
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
        userID,
        ...(status ? { status } : {}),
      },
    });

    if (parking.length === 0) {
      return { message: 'No parking found' };
    }

    return parking;
  }

  async stop(id: number, userID: number): Promise<object | null> {
    const parking = await this.findByID(id, userID);
    const endingTime: any = new Date();

    if (!parking || parking.message) {
      throw new BadRequestException(
        'This car was not found in your active parking records',
      );
    }

    const { startingTime, parkingZoneID }: any = parking;

    const usageTime: number =
      (endingTime - startingTime) / (1000 * PER_INTERVAL * 60);
    const { price } = await this.findParkingZoneByID(parkingZoneID);
    const totalAmount = +(usageTime * price).toFixed(2);
    try {
      await this.payForParking(userID, totalAmount);
    } catch (error) {
      parking.update({
        status: 'rejected',
        endingTime: startingTime,
      });
      return error.response;
    }

    parking.update({
      status: 'expired',
      endingTime,
      totalAmount,
    });

    return {
      message: `Car was parked off successfully, ${totalAmount} will be cut off from your balance`,
    };
  }

  async payForParking(id: number, amountToPay: number) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { balance } = user;
    const balanceAfterPay = balance - amountToPay;

    if (balanceAfterPay < 0 || balance === 0) {
      throw new BadRequestException(
        `You don't have enough balance, your current balance: ${balance}, amount to pay: ${amountToPay}`,
      );
    }

    user.update({
      balance: balanceAfterPay,
    });
  }

  async findByID(id: number, userID: number): Promise<Parking | any> {
    const parking = await this.parkingModel.findOne({
      attributes: [
        'id',
        'userID',
        'carID',
        'parkingZoneID',
        'status',
        'startingTime',
        'endingTime',
      ],
      where: {
        id,
        userID,
        status: 'active',
      },
    });

    if (!parking) {
      return { message: 'No parking found' };
    }

    return parking;
  }

  async findParkingZoneByID(id: number): Promise<ParkingZone | null> {
    return await this.parkingZoneModel.findOne({
      attributes: ['id', 'title', 'address', 'price'],
      where: {
        id,
      },
    });
  }

  async getParkingZoneRecords(parkingZoneID: number): Promise<Parking | any> {
    const parking = await this.parkingModel.findOne({
      attributes: [
        'id',
        'userID',
        'carID',
        'parkingZoneID',
        'status',
        'startingTime',
        'endingTime',
      ],
      where: {
        parkingZoneID,
      },
    });

    if (!parking) {
      return { message: 'No parking found' };
    }

    return parking;
  }
}
