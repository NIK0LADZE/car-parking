import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './cars/car.model';
import { CarsModule } from './cars/cars.module';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // This doesn't work for some reason, env variables are missing in other modules,
    // unless I import ConfigModule in those modules as well
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Car],
      autoLoadModels: true,
      // sync: { alter: true },
    }),
    UsersModule,
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
