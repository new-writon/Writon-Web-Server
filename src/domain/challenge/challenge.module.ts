import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './domain/entity/Challenge';
import { ChallengeDay } from './domain/entity/ChallengeDay';
import { ChallengeDepositDeduction } from './domain/entity/ChallengeDepositDeduction';
import { Question } from './domain/entity/Question';
import { Keyword } from './domain/entity/Keyword';
import { ChallengeDao } from './intrastructure/adapter/output/dao/Challenge.Dao';
import { ChallengeDayDao } from './intrastructure/adapter/output/dao/ChallengeDay.Dao';
import { QuestionDao } from './intrastructure/adapter/output/dao/Question.Dao';
import { MailManager } from '../../global/util/MailManager';
import { UserModule } from '../user/user.module';
import { DataMapperService } from './domain/service/DataMapper.Service';
import { UserApi } from './application/apis/User.Api';
import { ChallengeVerifyService } from 'src/global/exception/challenge/ChallengeVerify.Service';
import { ChallengeDayHelper } from './application/helper/ChallengeDay.Helper';
import { ChallengeHelper } from './application/helper/Challenge.Helper';
import { QuestionController } from './intrastructure/adapter/input/controller/Question.Controller';
import { InviteController } from './intrastructure/adapter/input/controller/Invite.Controller';
import { InformationController } from './intrastructure/adapter/input/controller/Information.Controller';
import { InformationInputPort } from './application/port/input/InformationInputPort';
import { QuestionInputPort } from './application/port/input/QuestionInputPort';
import { InviteInputPort } from './application/port/input/InviteInputPort';
import { AllChallengeCollector } from './application/service/implements/AllChallengeCollector';
import { BasicQuestionCollector } from './application/service/implements/BasicQuestionCollector';
import { SpecialQuestionCollector } from './application/service/implements/SpecialQuestionCollector';
import { ChallengeDateChecker } from './application/service/implements/ChallengeDateChecker';
import { ChallengeDateCollector } from './application/service/implements/ChallengeDateCollector';
import { Invitor } from './application/service/implements/Invitor';
import { StatusCollector } from './application/service/implements/StatusCollector';
import { QuestionHelper } from './application/helper/Question.Helper';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultQuestion, DefaultQuestionSchema } from './domain/entity/mongo/DefaultQuestion';
import { DefaultQuestionCollector } from './application/service/implements/DefaultQuestionCollector';
import { DefaultQuestionDao } from './intrastructure/adapter/output/dao/DefaultQuestion.Dao';
import { DefaultQuestionHelper } from './application/helper/DefaultQuestion.Helper';
import { ChallengeRegistrant } from './application/service/implements/ChallengeRegistrant';
import { ChallengeDayRegistrant } from './application/service/implements/ChallengeDayRegistrant';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      ChallengeDay,
      ChallengeDepositDeduction,
      Question,
      Keyword,
    ]),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: DefaultQuestion.name, schema: DefaultQuestionSchema }]),
  ],
  providers: [
    InformationInputPort,
    QuestionInputPort,
    InviteInputPort,
    ChallengeHelper,
    ChallengeDayHelper,
    QuestionHelper,
    MailManager,
    DataMapperService,
    UserApi,
    ChallengeVerifyService,
    { provide: 'challengeImpl', useClass: ChallengeDao },
    { provide: 'challengedayImpl', useClass: ChallengeDayDao },
    { provide: 'questionImpl', useClass: QuestionDao },
    { provide: 'defaultquestionImpl', useClass: DefaultQuestionDao },
    AllChallengeCollector,
    BasicQuestionCollector,
    SpecialQuestionCollector,
    ChallengeDateChecker,
    ChallengeDateCollector,
    Invitor,
    StatusCollector,
    DefaultQuestionCollector,
    DefaultQuestionHelper,
    ChallengeRegistrant,
    ChallengeDayRegistrant,
    {
      provide: 'INFORMATION_HANDLERS',
      useFactory: (
        allChallengeCollector: AllChallengeCollector,
        challengeDateChecker: ChallengeDateChecker,
        challengeDateCollector: ChallengeDateCollector,
        statusCollector: StatusCollector,
      ) => [allChallengeCollector, challengeDateChecker, challengeDateCollector, statusCollector],
      inject: [
        AllChallengeCollector,
        ChallengeDateChecker,
        ChallengeDateCollector,
        StatusCollector,
      ],
    },
    {
      provide: 'INVITE_HANDLERS',
      useFactory: (invitor: Invitor) => [invitor],
      inject: [Invitor],
    },
    {
      provide: 'QUESTION_HANDLERS',
      useFactory: (
        basicQuestionCollector: BasicQuestionCollector,
        specialQuestionCollector: SpecialQuestionCollector,
        defaultQuestionCollector: DefaultQuestionCollector,
      ) => [basicQuestionCollector, specialQuestionCollector, defaultQuestionCollector],
      inject: [BasicQuestionCollector, SpecialQuestionCollector, DefaultQuestionCollector],
    },
  ],
  controllers: [InformationController, QuestionController, InviteController],
  exports: [
    ChallengeHelper,
    ChallengeDayHelper,
    QuestionHelper,
    DefaultQuestionHelper,
    ChallengeVerifyService,
    ChallengeDayRegistrant,
    ChallengeRegistrant,
  ],
})
export class ChallengeModule {}
