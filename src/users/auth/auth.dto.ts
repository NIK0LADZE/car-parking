import { BaseUserDTO } from 'src/users/baseUser.dto';
import { UserInterface } from 'src/users/User.interface';

export class AuthDTO extends BaseUserDTO implements UserInterface {
  /**
   * Populates AuthDTO with username and password, later to be validated
   */
  populate({ username, password }) {
    this.username = username;
    this.password = password;
  }
}
