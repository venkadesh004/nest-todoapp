import {
  Controller,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() userData: GetUserDto) {
    const user = await this.userService.findOne(userData.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log(user);
    return this.authService.signIn(
      user.username,
      user.email,
      user.password,
      userData.password,
    );
  }
}
