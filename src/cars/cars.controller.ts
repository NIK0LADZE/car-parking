import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { UpdateCarDTO } from './UpdateCar.dto';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './CreateCar.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCar(@Body() car: CreateCarDTO, @Request() { user: { userID } }) {
    this.carsService.create(car, userID);
    return { message: 'Car was added successfully!' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateCar(@Body() car: UpdateCarDTO, @Request() { user: { userID } }) {
    return this.carsService.update(car, userID);
  }
}
