import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Satisfaction } from './domain/entity/Satisfaction';
import { SatisfactionObjectiveResult } from './domain/entity/SatisfactionObjectiveResult';
import { SatisfactionSubjectiveResult } from './domain/entity/SatisfactionSubjectiveResult';
import { ResponseController } from './presentation/Response.Controller';
import { SatisfactionController } from './presentation/Satisfaction.Controller';
import { SatisfactionService } from './service/Satisfaction.Service';
import { ResponseService } from './service/Response.Service';
import { UserApi } from './infrastructure/User.Api';
import { UserModule } from '../user/user.module';
import { ChallengeApi } from './infrastructure/Challenge.Api';
import { ChallengeModule } from '../challenge/challenge.module';
import { TemplateApi } from './infrastructure/Template.Api';
import { TemplateModule } from '../template/template.module';
import { SatisfactionDao } from './domain/repository/dao/Satisfaction.Dao';
import { SatisfactionHelper } from './helper/Satisfaction.Helper';
import { SatisfactionObjectiveResultDao } from './domain/repository/dao/SatisfactionObjectiveResult.Dao';
import { SatisfactionSubjectiveResultDao } from './domain/repository/dao/SatisfactionSubjectiveResult.Dao';
import { SatisfactionObjectiveResultHelper } from './helper/SatisfactionObjectiveResult.Helper';
import { SatisfactionSubjectiveResultHelper } from './helper/SatisfactionSubjectiveResult.Helper';
import { SatisfactionVerifyService } from 'src/global/exception/satisfaction/SatisfactionVerify.Service';

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
    UserApi,
    ChallengeApi,
    TemplateApi,
    SatisfactionHelper,
    SatisfactionObjectiveResultHelper,
    SatisfactionSubjectiveResultHelper,
    SatisfactionVerifyService
  ],
  controllers: [ResponseController, SatisfactionController],
  exports:[SatisfactionHelper, SatisfactionVerifyService]
})
export class SatisfactionModule {}
