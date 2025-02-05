import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from 'src/exception-filter/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/addUser')
  addUser(@Body() userData: CreateUserDto, @Res() res: Response) {
    this.userService
      .addUsers(userData)
      .then((user) => {
        return res.status(201).send('User is created!');
      })
      .catch((err) => {
        // console.log(err);
        return res.status(err.status).send(err);
      });
  }
}
