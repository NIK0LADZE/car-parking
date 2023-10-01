import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Parking } from 'src/parking/parking.model';
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

  @HasMany(() => Parking)
  parking: Parking;
}
