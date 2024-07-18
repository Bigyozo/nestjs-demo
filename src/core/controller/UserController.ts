import { Body, Controller, Post } from '@nestjs/common';

import { UserCreateRequest } from '../dto/UserCreateRequest';
import { UserService } from '../service/UserService';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest);
  }
}
