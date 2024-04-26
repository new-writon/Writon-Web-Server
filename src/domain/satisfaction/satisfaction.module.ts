import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { HttpExceptionFilter } from '../../global/exception/HttpExceptionFilter.js';
import { APP_FILTER } from '@nestjs/core';
import { Satisfaction } from './domain/entity/Satisfaction.js';
import { SatisfactionObjectiveResult } from './domain/entity/SatisfactionObjectiveResult.js';
import { SatisfactionSubjectiveResult } from './domain/entity/SatisfactionSubjectiveResult.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult]),

  
  ],
  providers: [
 
  ],
  controllers: [],
})
export class SatisfactionModule {}
