import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { bcryptPassword, comparePasswords } from '../utils/bcrypt';
import { ForgotPasswordDTO } from './forgotPassword/forgotPassword.dto';
import { UserDTO } from './user.dto';
import { User } from './user.model';

export interface FoundUser {
  userId: number;
  username: string;
}

export interface JwtPayload {
  username: string;
  sub: string | number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  create(user: UserDTO): Promise<User> {
    const { username, password, role } = user;
    const hashedPassword = bcryptPassword(password);

    return this.userModel.create({
      username,
      password: hashedPassword,
      balance: role === 'user' ? 100 : null,
      role,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<object | null> {
    const user = await this.findByUsername(username);

    if (user) {
      const { id: userId, username, password: hashedPassword } = user;
      const didMatch = comparePasswords(password, hashedPassword);

      if (didMatch) {
        return { userId, username };
      }
    }
  }

  signIn(user: FoundUser) {
    const { userId, username } = user;
    const payload: JwtPayload = { username, sub: userId };

    return {
      username,
      access_token: this.jwtService.sign(payload),
      message: 'Authorization was successful!',
    };
  }

  async setNewPassword(
    incomingUserData: ForgotPasswordDTO,
  ): Promise<object | null> {
    const { username, password } = incomingUserData;
    const user = await this.findByUsername(username);
    const { password: previousPassword } = user;
    const hashedPassword = bcryptPassword(password);
    const didMatch = comparePasswords(password, previousPassword);

    if (!user) {
      throw new BadRequestException('Username is incorrect');
    }

    if (didMatch) {
      throw new BadRequestException(
        "New password shouldn't be the same as old password",
      );
    }

    user.update({ password: hashedPassword });

    return { message: 'Password was changed successfully!' };
  }
}
