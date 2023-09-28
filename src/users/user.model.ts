import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Car } from 'src/cars/car.model';
import { UserInterface } from './User.interface';

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
  @Column
  balance: number;

  @AllowNull(false)
  @Column
  role: string;

  @HasMany(() => Car)
  car: Car[];
}
