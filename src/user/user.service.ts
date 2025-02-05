import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUsers(userData: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userData.email }).exec();
    if (user) {
      // console.log('User already present');
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = encodePassword(userData.password);
    const createUser = new this.userModel({ ...userData, password });
    // console.log(createUser);
    return createUser.save();
  }

  async findOne(email: string): Promise<CreateUserDto> {
    const user = await this.userModel.findOne({ email: email }).exec();

    return user;
  }
}
