import {
  AllowNull,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Parking } from 'src/parking/parking.model';
import { User } from 'src/users/user.model';
import { CarInterface } from './car.interface';

@Table
export class Car extends Model implements CarInterface {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Unique(true)
  @Column
  stateID: string;

  @AllowNull(false)
  @Column
  type: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userID: number;

  @HasMany(() => Parking)
  parking: Parking;
}
