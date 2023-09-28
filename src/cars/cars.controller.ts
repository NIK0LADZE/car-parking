import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { UpdateOrDeleteCarDTO } from './UpdateOrDeleteCar.dto';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './CreateCar.dto';
import { BaseCarDTO } from './BaseCar.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCar(@Body() car: CreateCarDTO, @Request() { user: { userID } }) {
    return await this.carsService.create(car, userID);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateCar(
    @Body() car: UpdateOrDeleteCarDTO,
    @Request() { user: { userID } },
  ) {
    return await this.carsService.update(car, userID);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCar(@Body() car: BaseCarDTO, @Request() { user: { userID } }) {
    return await this.carsService.delete(car, userID);
  }
}
