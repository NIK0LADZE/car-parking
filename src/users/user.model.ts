import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  Min,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Car } from 'src/cars/car.model';
import { Parking } from 'src/parking/parking.model';
import { UserInterface } from './user.interface';

@Table
export class User extends Model implements UserInterface {
  @AllowNull(false)
  @Unique(true)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(true)
  @Min(0)
  @Column({
    type: DataTypes.FLOAT,
  })
  balance: number;

  @AllowNull(false)
  @Column
  role: string;

  @HasMany(() => Parking)
  parking: Parking[];

  @HasMany(() => Car)
  car: Car[];
}
