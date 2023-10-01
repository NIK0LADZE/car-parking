import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ParkingZoneInterface } from './parking-zone.interface';

@Table
export class ParkingZone extends Model implements ParkingZoneInterface {
  @AllowNull(false)
  @Unique(true)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;
}
