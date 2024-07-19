import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import database from './config/database';
import { UserController } from './controller/UserController';
import { Role } from './entity/Role';
import { User } from './entity/User';
import { ValidataionPipe } from './pipe/ValidataionPipe';
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import { UserService } from './service/UserService';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './controller/TokenController';
import { AuthService } from './service/AuthService';
import { SECRET_KEY } from './constant/user';
import { AuthGuard } from './guard/AuthGuard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User, Role]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserController, TokenController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidataionPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CoreModule {}
