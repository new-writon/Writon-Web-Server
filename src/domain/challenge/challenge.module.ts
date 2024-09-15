import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './domain/entity/Challenge';
import { ChallengeDay } from './domain/entity/ChallengeDay';
import { ChallengeDepositDeduction } from './domain/entity/ChallengeDepositDeduction';
import { Question } from './domain/entity/Question';
import { Keyword } from './domain/entity/Keyword';
import { ChallengeInformationController } from './presentation/ChallengeInformation.Controller';
import { ChallengeInformationService } from './service/ChallengeInformation.Service';
import { ChallengeDao } from './domain/repository/dao/Challenge.Dao';
import { ChallengeDayDao } from './domain/repository/dao/ChallengeDay.Dao';
import { ChallengeHelper } from './helper/Challenge.Helper';
import { ChallengeDayHelper } from './helper/ChallengeDay.Helper';
import { ChallengeQuestionService } from './service/ChallengeQuestion.Service';
import { ChallengeQuestionController } from './presentation/ChallengeQuestion.Controller';
import { QuestionDao } from './domain/repository/dao/Question.Dao';
import { ChallengeInviteController } from './presentation/ChallengeInvite.Controller';
import { ChallengeInviteService } from './service/ChallengeInvite.Service';
import { MailManager } from '../../global/util/MailManager';
import { QuestionHelper } from './helper/Question.Helper';
import { UserModule } from '../user/user.module';
import { DataMapperService } from './domain/service/DataMapper.Service';
import { UserApi } from './intrastructure/User.Api';
import { ChallengeVerifyService } from 'src/global/exception/challenge/ChallengeVerify.Service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, ChallengeDay, ChallengeDepositDeduction, Question, Keyword]),
    forwardRef(() => UserModule)
    
  

  ],
  providers: [
    ChallengeInformationService, 
    ChallengeQuestionService,
    ChallengeInviteService,
    ChallengeHelper,
    ChallengeDayHelper,
    QuestionHelper,
    MailManager,
    DataMapperService,
    UserApi,
    ChallengeVerifyService,
    {provide: 'challengeImpl',  useClass: ChallengeDao},
    {provide: 'challengedayImpl',  useClass: ChallengeDayDao},
    {provide: 'questionImpl', useClass:QuestionDao}
  
  ],
  controllers: [ChallengeInformationController, ChallengeQuestionController, ChallengeInviteController],
  exports:[
    ChallengeHelper,
    ChallengeDayHelper,
    QuestionHelper,
    ChallengeVerifyService
  ]
})
export class ChallengeModule {}
