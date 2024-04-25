import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserController } from './presentation/User.controller.js';
import { User } from '../user/domain/entity/user.entitiy.js';
import { UserService  } from './domain/service/User.service.js';
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
