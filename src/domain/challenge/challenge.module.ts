import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './domain/entity/Challenge.js';
import { ChallengeDay } from './domain/entity/ChallengeDay.js';
import { ChallengeDepositDeduction } from './domain/entity/ChallengeDepositDeduction.js';
import { Question } from './domain/entity/Question.js';
import { QuestionTag } from './domain/entity/QuestionTag.js';
import { ChallengeInformationController } from './presentation/ChallengeInformation.Controller.js';
import { ChallengeInformationService } from './service/ChallengeInformation.Service.js';
import { ChallengeDao } from './domain/repository/dao/Challenge.Dao.js';
import { ChallengeDayDao } from './domain/repository/dao/ChallengeDay.Dao.js';
import { ChallengeHelper } from './helper/Challenge.Helper.js';
import { ChallengeDayHelper } from './helper/ChallengeDay.Helper.js';
import { ChallengeQuestionService } from './service/ChallengeQuestion.Service.js';
import { ChallengeQuestionController } from './presentation/ChallengeQuestion.Controller.js';
import { QuestionDao } from './domain/repository/dao/Question.Dao.js';
import { ChallengeInviteController } from './presentation/ChallengeInvite.Controller.js';
import { ChallengeInviteService } from './service/ChallengeInvite.Service.js';
import { MailManager } from '../../global/util/MailManager.js';
import { QuestionHelper } from './helper/Question.Helper.js';
import { ChallengeVerifyService } from './domain/service/ChallengeVerify.Service.js';



@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, ChallengeDay, ChallengeDepositDeduction, Question, QuestionTag]),

  ],
  providers: [
    ChallengeInformationService, 
    ChallengeQuestionService,
    ChallengeInviteService,
    ChallengeVerifyService,
    ChallengeHelper,
    ChallengeDayHelper,
    QuestionHelper,
    MailManager,
    {provide: 'challengeImpl',  useClass: ChallengeDao},
    {provide: 'challengedayImpl',  useClass: ChallengeDayDao},
    {provide: 'questionImpl', useClass:QuestionDao}
  
  ],
  controllers: [ChallengeInformationController, ChallengeQuestionController, ChallengeInviteController],
  exports:[
    ChallengeHelper,
    ChallengeDayHelper
  ]
})
export class ChallengeModule {}
