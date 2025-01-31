import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    getUser(userData: CreateUserDto) {
        // console.log(userData);
        // const user = this.users.find(user => (user.email === userData.email && user.password === userData.password));
        const user = this.userModel.findOne({ email: userData.email, password: userData.password }).exec();
        // user.then(data => {
        //     console.log(data);
        //     if (data !== null) {
        //         return data;
        //     } else {
        //         // console.log("Here");
        //         return new HttpException('User not found', HttpStatus.NOT_FOUND);
        //     }
        // }).catch(err => {
        //     return new HttpException(`Internal server Error ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        // });
        return user;
    }

    async addUsers(userData: CreateUserDto): Promise<User> {
        const createUser = new this.userModel(userData);
        console.log(createUser);
        return createUser.save();
    }
}
