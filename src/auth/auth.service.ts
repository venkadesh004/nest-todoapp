import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    username: string,
    email: string,
    password: string,
    inputPassword: string,
  ): Promise<{ access_token: string }> {
    // console.log(username, email, password, inputPassword);
    if (comparePassword(password, inputPassword)) {
      throw new UnauthorizedException();
    }
    // console.log('Here');
    const payload = { username: username, email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
