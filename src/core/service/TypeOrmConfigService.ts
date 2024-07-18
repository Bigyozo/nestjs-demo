import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import database from '../config/database';
import { User } from '../entity/User';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService,
    @Inject(database.KEY)
    private dbconfig: ConfigType<typeof database>,
  ) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.dbconfig.username,
      password: this.dbconfig.password,
      database: this.configService.get<string>('DATABASE'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
