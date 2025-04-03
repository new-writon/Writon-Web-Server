import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './domain/entity/Comment';
import { Likes } from './domain/entity/Likes';
import { QuestionContent } from './domain/entity/QuestionContent';
import { UserTemplate } from './domain/entity/UserTemplate';
import { UserModule } from '../user/user.module';
import { DataMapperService } from './domain/service/DataMappper.Service';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { ChallengeModule } from '../challenge/challenge.module';
import { UserTemplateDao } from './infrastructure/adapter/output/dao/UserTemplate.Dao';
import { QuestionContentDao } from './infrastructure/adapter/output/dao/QuestionContent.Dao';
import { CommentDao } from './infrastructure/adapter/output/dao/Comment.Dao';
import { LikeDao } from './infrastructure/adapter/output/dao/Like.Dao';
import { UserTemplateHelper } from './infrastructure/adapter/input/helper/UserTemplate.Helper';
import { LikeHelper } from './infrastructure/adapter/input/helper/Like.Helper';
import { QuestionContentHelper } from './infrastructure/adapter/input/helper/QuestionContent.Helper';
import { CommentHelper } from './infrastructure/adapter/input/helper/Comment.Helper';
import { ChallengeApi } from './infrastructure/adapter/output/apis/Challenge.Api';
import { TemplateInputPort } from './application/port/input/TemplateInputPort';
import { CommentInputPort } from './application/port/input/CommentInputPort';
import { UserTemplateTransaction } from './infrastructure/adapter/output/transaction/UserTemplate.Transaction';
import { LikeInputPort } from './application/port/input/LikeInputPort';
import { TemplateRegistrant } from './application/service/implement/TemplateRegistrant';
import { TemplateQueryByDate } from './application/service/implement/TemplateQueryByDate';
import { TemplateNotifier } from './application/service/implement/TemplateNotifier';
import { TemplateEditor } from './application/service/implement/TemplateEditor';
import { MyTemplateCollector } from './application/service/implement/MyTemplateCollector';
import { LikePressUserCollector } from './application/service/implement/LikePressUserCollector';
import { LikeRegistrant } from './application/service/implement/LikeRegistrant';
import { LikeEraser } from './application/service/implement/LikeEraser';
import { CommentChecker } from './application/service/implement/CommentChecker';
import { CommentEditor } from './application/service/implement/CommentEditor';
import { CommentEraser } from './application/service/implement/CommentEraser';
import { CommentRegistrant } from './application/service/implement/CommentRegistrant';
import { TemplateCommentCollector } from './application/service/implement/TemplateCommentCollector';
import { MyCommentCollector } from './application/service/implement/MyCommentCollector';
import { LikeCountCollector } from './application/service/implement/LikeCountCollector';
import { LikeChecker } from './application/service/implement/LikeChecker';
import { TemplateFetcher } from './application/service/implement/TemplateFetcher';
import { TemplateController } from './infrastructure/adapter/input/controller/Template.Controller';
import { CommentController } from './infrastructure/adapter/input/controller/Comment.Controller';
import { LikeController } from './infrastructure/adapter/input/controller/Like.Controller';
import { UserApi } from './infrastructure/adapter/output/apis/User.Api';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Likes, QuestionContent, UserTemplate]),
    forwardRef(() => UserModule),
    ChallengeModule,
  ],
  providers: [
    { provide: 'usertemplateImpl', useClass: UserTemplateDao },
    { provide: 'questionContentImpl', useClass: QuestionContentDao },
    { provide: 'commentImpl', useClass: CommentDao },
    { provide: 'likeImpl', useClass: LikeDao },
    UserTemplateHelper,
    LikeHelper,
    QuestionContentHelper,
    CommentHelper,
    UserApi,
    ChallengeApi,
    TemplateInputPort,
    CommentInputPort,
    LikeInputPort,
    DataMapperService,
    UserTemplateTransaction,
    TemplateVerifyService,
    UserVerifyService,
    AlarmService,
    CommentChecker,
    CommentEditor,
    CommentEraser,
    CommentRegistrant,
    MyCommentCollector,
    TemplateCommentCollector,
    LikeChecker,
    LikeCountCollector,
    LikeEraser,
    LikeRegistrant,
    LikePressUserCollector,
    MyTemplateCollector,
    TemplateEditor,
    TemplateFetcher,
    TemplateNotifier,
    TemplateQueryByDate,
    TemplateRegistrant,
    {
      provide: 'COMMENT_HANDLERS',
      useFactory: (
        commentChecker: CommentChecker,
        myCommentCollector: MyCommentCollector,
        templateCommentCollector: TemplateCommentCollector,
        commentEditor: CommentEditor,
        commentEraser: CommentEraser,
        commentRegistrant: CommentRegistrant,
      ) => [
        commentChecker,
        myCommentCollector,
        templateCommentCollector,
        commentEditor,
        commentEraser,
        commentRegistrant,
      ],
      inject: [
        CommentChecker,
        MyCommentCollector,
        TemplateCommentCollector,
        CommentEditor,
        CommentEraser,
        CommentRegistrant,
      ],
    },
    {
      provide: 'LIKE_HANDLERS',
      useFactory: (
        likeChecker: LikeChecker,
        likeCountCollector: LikeCountCollector,
        likeEraser: LikeEraser,
        likeRegistrant: LikeRegistrant,
        likePressUserCollector: LikePressUserCollector,
      ) => [likeChecker, likeCountCollector, likeEraser, likeRegistrant, likePressUserCollector],
      inject: [LikeChecker, LikeCountCollector, LikeEraser, LikeRegistrant, LikePressUserCollector],
    },
    {
      provide: 'TEMPLATE_HANDLERS',
      useFactory: (
        myTemplateCollector: MyTemplateCollector,
        templateEditor: TemplateEditor,
        templateFetcher: TemplateFetcher,
        templateNotifier: TemplateNotifier,
        templateQueryByDate: TemplateQueryByDate,
        templateRegistrant: TemplateRegistrant,
      ) => [
        myTemplateCollector,
        templateEditor,
        templateFetcher,
        templateNotifier,
        templateQueryByDate,
        templateRegistrant,
      ],
      inject: [
        MyTemplateCollector,
        TemplateEditor,
        TemplateFetcher,
        TemplateNotifier,
        TemplateQueryByDate,
        TemplateRegistrant,
      ],
    },
  ],
  controllers: [TemplateController, CommentController, LikeController],
  exports: [UserTemplateHelper],
})
export class TemplateModule {}
