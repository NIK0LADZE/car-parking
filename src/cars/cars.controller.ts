import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { CarDTO } from './car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addCar(@Body() car: CarDTO, @Request() { user: { userID } }) {
    this.carsService.create(car, userID);
    return { message: 'Car was added successfully!' };
  }
}
