import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Match } from './decorators/Match.decorator';
import { IsUsernameUnique } from './decorators/IsUsernameUnique.decorator';
import { UserInterface } from './User.interface';

export enum UserValidationGroups {
  AUTH = 'AUTH',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export class UserDTO implements UserInterface {
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(4, 20, { groups: [UserValidationGroups.REGISTER] })
  @IsUsernameUnique({
    message: 'Username $value already exists. Choose another name.',
    groups: [UserValidationGroups.REGISTER],
  })
  username: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(8, 20, {
    groups: [
      UserValidationGroups.REGISTER,
      UserValidationGroups.FORGOT_PASSWORD,
    ],
  })
  password: string;

  @IsOptional({ groups: [UserValidationGroups.AUTH] })
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(8, 20, { always: true })
  @Match('password', {
    message: "Passwords don't match",
    always: true,
  })
  passwordConfirm: string;

  @Matches(/^(user|admin)$/, {
    message: "Role must be either 'user' or 'admin'",
    groups: [UserValidationGroups.REGISTER],
  })
  role: string;

  /**
   * Populates AuthDTO with username and password, later to be validated
   */
  populate({ username, password }) {
    this.username = username;
    this.password = password;
  }
}
