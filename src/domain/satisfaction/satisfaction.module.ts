import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Satisfaction } from './domain/entity/Satisfaction.js';
import { SatisfactionObjectiveResult } from './domain/entity/SatisfactionObjectiveResult.js';
import { SatisfactionSubjectiveResult } from './domain/entity/SatisfactionSubjectiveResult.js';
import { ResponseController } from './presentation/Response.Controller.js';
import { SatisfactionController } from './presentation/Satisfaction.Controller.js';
import { SatisfactionService } from './service/Satisfaction.Service.js';
import { ResponseService } from './service/Response.Service.js';
import { UserApi } from './infrastructure/User.Api.js';
import { UserModule } from '../user/user.module.js';
import { ChallengeApi } from './infrastructure/Challenge.Api.js';
import { ChallengeModule } from '../challenge/challenge.module.js';
import { TemplateApi } from './infrastructure/Template.Api.js';
import { TemplateModule } from '../template/template.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult]),
    UserModule,
    ChallengeModule,
    TemplateModule

  
  ],
  providers: [
    SatisfactionService,
    ResponseService,
    UserApi,
    ChallengeApi,
    TemplateApi
  ],
  controllers: [ResponseController, SatisfactionController],
})
export class SatisfactionModule {}
