import { IsNotEmpty, MinLength } from 'class-validator';

export class TokenCreateRequest {
  @IsNotEmpty({
    message: 'username can not be empty',
  })
  username: string;

  @IsNotEmpty({
    message: 'password can not be empty',
  })
  @MinLength(6, { message: 'password need to be longer than 6' })
  password: string;
}
