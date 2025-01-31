import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @HttpCode(200)
    @Post('/getUser')
    getUser(@Body() userData: CreateUserDto) {
        return this.userService.getUser(userData);
    }

    @Post('/addUser')
    addUser(@Body() userData: CreateUserDto) {
        return this.userService.addUsers(userData);
    }
}
