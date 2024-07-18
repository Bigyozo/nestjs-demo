import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import database from './config/database';
import { UserController } from './controller/UserController';
import { Role } from './entity/Role';
import { User } from './entity/User';
import { ValidataionPipe } from './pipe/ValidataionPipe';
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import { UserService } from './service/UserService';

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
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: ValidataionPipe,
    },
  ],
})
export class CoreModule {}
