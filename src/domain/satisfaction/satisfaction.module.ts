import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Satisfaction } from './domain/entity/Satisfaction.js';
import { SatisfactionObjectiveResult } from './domain/entity/SatisfactionObjectiveResult.js';
import { SatisfactionSubjectiveResult } from './domain/entity/SatisfactionSubjectiveResult.js';
import { ResponseController } from './presentation/Response.Controller.js';
import { SatisfactionController } from './presentation/Satisfaction.Controller.js';
import { SatisfactionService } from './service/Satisfaction.Service.js';
import { ResponseService } from './service/Response.Service.js';
import { UserApi } from './infrastructure/User.Api.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult]),
    UserModule

  
  ],
  providers: [
    SatisfactionService,
    ResponseService,
    UserApi
  ],
  controllers: [ResponseController, SatisfactionController],
})
export class SatisfactionModule {}
