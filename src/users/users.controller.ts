import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ForgotPasswordDTO } from './forgotPassword/forgotPassword.dto';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  addUser(@Body() user: UserDTO) {
    this.usersService.create(user);
    return { message: 'Registration was successful!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  signIn(@Request() req) {
    return this.usersService.signIn(req.user);
  }

  @Post('forgot-password')
  setNewPassword(@Body() user: ForgotPasswordDTO) {
    console.log(user);

    return this.usersService.setNewPassword(user);
  }
}
