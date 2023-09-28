import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseUserDTO } from '../baseUser.dto';
import { Match } from '../decorators/Match.decorator';
import { UserInterface } from '../User.interface';

export class ForgotPasswordDTO extends BaseUserDTO implements UserInterface {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: "Passwords don't match" })
  passwordConfirm: string;
}
