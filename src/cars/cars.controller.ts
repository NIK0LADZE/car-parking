import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { CarsService } from './cars.service';
import { CarDTO, CarValidationGroups } from './car.dto';
import { ValidationPipeWithGlobalOptions } from 'src/pipes/validation-with-global-options.pipe';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.CREATE],
    }),
  )
  async createCar(@Body() car: CarDTO, @Request() { user: { userID } }) {
    return await this.carsService.create(car, userID);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.UPDATE],
    }),
  )
  async updateCar(@Body() car: CarDTO, @Request() { user: { userID } }) {
    return await this.carsService.update(car, userID);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.DELETE],
    }),
  )
  async deleteCar(@Body() car: CarDTO, @Request() { user: { userID } }) {
    return await this.carsService.delete(car, userID);
  }
}
