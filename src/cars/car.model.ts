import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { CarInterface } from './Car.interface';

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

  @BelongsTo(() => User)
  user: User;
}
