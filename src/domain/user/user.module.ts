import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserController } from './presentation/User.Controller.js';
import { User } from './domain/entity/User.Entitiy.js';
import { UserService  } from './domain/service/User.Service.js';
import { HttpExceptionFilter } from '../../global/exception/HttpExceptionFilter.js';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

  
  ],
  providers: [
    UserService
  ],
  controllers: [UserController],
})
export class UserModule {}
