import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { bcryptPassword } from '../utils/bcrypt';
import { UserDTO } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(UserDTO: UserDTO): Promise<User> {
    const { username, password, role } = UserDTO;
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
}
