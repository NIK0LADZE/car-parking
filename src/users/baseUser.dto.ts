import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserInterface } from './User.interface';

export class BaseUserDTO implements UserInterface {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
