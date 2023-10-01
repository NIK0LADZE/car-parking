import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipeWithGlobalOptions } from 'src/pipes/validation-with-global-options.pipe';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserDTO, UserValidationGroups } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [UserValidationGroups.REGISTER],
    }),
  )
  async addUser(@Body() user: UserDTO) {
    this.usersService.create(user);
    return { message: 'Registration was successful!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  signIn(@Request() req) {
    return this.usersService.signIn(req.user);
  }

  @Patch('forgot-password')
  @UsePipes(
    new ValidationPipeWithGlobalOptions({
      groups: [UserValidationGroups.FORGOT_PASSWORD],
    }),
  )
  async setNewPassword(@Body() user: UserDTO) {
    return this.usersService.setNewPassword(user);
  }
}
