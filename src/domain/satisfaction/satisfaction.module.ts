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
import { SatisfactionDao } from './domain/repository/dao/Satisfaction.Dao.js';
import { SatisfactionVerifyService } from './domain/service/SatisfactionVerify.Service.js';
import { SatisfactionHelper } from './helper/Satisfaction.Helper.js';
import { SatisfactionObjectiveResultDao } from './domain/repository/dao/SatisfactionObjectiveResult.Dao.js';
import { SatisfactionSubjectiveResultDao } from './domain/repository/dao/SatisfactionSubjectiveResult.Dao.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Satisfaction, SatisfactionObjectiveResult, SatisfactionSubjectiveResult]),
    UserModule,
    ChallengeModule,
    TemplateModule

  
  ],
  providers: [
    {provide: 'satisfactionImpl',  useClass: SatisfactionDao},
    {provide: 'satisfactionObjectiveResultImpl',  useClass: SatisfactionObjectiveResultDao},
    {provide: 'satisfactionSubjectiveResultImpl',  useClass: SatisfactionSubjectiveResultDao},
    SatisfactionService,
    ResponseService,
    SatisfactionVerifyService,
    UserApi,
    ChallengeApi,
    TemplateApi,
    SatisfactionHelper
  ],
  controllers: [ResponseController, SatisfactionController],
  exports:[SatisfactionHelper]
})
export class SatisfactionModule {}
