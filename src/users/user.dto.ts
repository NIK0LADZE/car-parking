import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from './decorators/Match.decorator';
import { IsUsernameUnique } from './decorators/IsUsernameUnique.decorator';
import { UserInterface } from './User.interface';

export class UserDTO implements UserInterface {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsUsernameUnique({
    message: 'Username $value already exists. Choose another name.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: "Passwords don't match" })
  passwordConfirm: string;

  @Matches(/^(user|admin)$/, {
    message: "Role must be either 'user' or 'admin'",
  })
  role: string;
}
