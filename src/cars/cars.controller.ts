import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { RolesGuard } from 'src/users/roles/roles.guard';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.CREATE],
    }),
  )
  async createCar(@Body() car: CarDTO, @Request() { user: { userID } }) {
    return await this.carsService.create(car, userID);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  async getAllCars(@Request() { user: { userID } }) {
    return await this.carsService.getAll(userID);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  async findOne(@Param() { id }: any, @Request() { user: { userID } }) {
    return await this.carsService.findByID(id, userID);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.UPDATE],
    }),
  )
  async updateCar(
    @Param() { id }: any,
    @Body() car: CarDTO,
    @Request() { user: { userID } },
  ) {
    return await this.carsService.update(car, id, userID);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [CarValidationGroups.DELETE],
    }),
  )
  async deleteCar(@Param() { id }: any, @Request() { user: { userID } }) {
    return await this.carsService.delete(id, userID);
  }
}
