import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
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
}
