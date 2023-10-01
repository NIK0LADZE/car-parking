import { DataTypes, NonAttribute } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Car } from 'src/cars/car.model';
import { ParkingZone } from 'src/parking-zones/parking-zone.model';
import { User } from 'src/users/user.model';
import { ParkingInterface } from './parking.interface';

@Table
export class Parking extends Model implements ParkingInterface {
  @BelongsTo(() => User)
  declare user?: NonAttribute<User>;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userID: number;

  @BelongsTo(() => Car)
  declare car?: NonAttribute<Car>;

  @ForeignKey(() => Car)
  @AllowNull(false)
  @Column
  carID: number;

  @BelongsTo(() => ParkingZone)
  declare parkingZone?: NonAttribute<ParkingZone>;

  @ForeignKey(() => ParkingZone)
  @AllowNull(false)
  @Column
  parkingZoneID: number;

  @AllowNull(true)
  @Column
  status: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.DATE,
  })
  startingTime: Date;

  @AllowNull(true)
  @Column({
    type: DataTypes.DATE,
  })
  endingTime: Date;

  @AllowNull(true)
  @Column({
    type: DataType.FLOAT,
  })
  totalAmount: number;
}
