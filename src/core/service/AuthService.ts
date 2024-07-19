import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { UserService } from './UserService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(tokenCreateRequest: TokenCreateRequest) {
    const user = await this.userService.findByUsername(
      tokenCreateRequest.username,
    );
    if (!user) {
      throw new NotFoundException('The username is not exist');
    }
    const isMatch = await bcrypt.compare(
      tokenCreateRequest.password,
      user.encryptedPassword,
    );
    if (!isMatch) {
      throw new UnauthorizedException('wrong password');
    }
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return this.jwtService.signAsync(payload);
  }
}
