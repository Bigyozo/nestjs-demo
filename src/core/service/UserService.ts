import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserCreateRequest } from '../dto/UserCreateRequest';
import { User } from '../entity/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userPepository: Repository<User>,
  ) {}

  async create(userCreateRequest: UserCreateRequest): Promise<User> {
    const existedUser: User = await this.findByUsername(
      userCreateRequest.username,
    );
    if (existedUser) {
      throw new HttpException('The username has been used', 400);
    }
    const user: User = new User();
    user.username = userCreateRequest.username;
    user.encryptedPassword = userCreateRequest.password;
    const salt: string = await bcrypt.genSalt();
    user.encryptedPassword = await bcrypt.hash(
      userCreateRequest.password,
      salt,
    );
    return this.userPepository.save(user);
  }

  async findByUsername(username: string) {
    const user: User = await this.userPepository.findOneBy({ username });
    return user;
  }
}
