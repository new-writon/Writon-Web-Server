import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './domain/entity/Comment';
import { Likes } from './domain/entity/Likes';
import { QuestionContent } from './domain/entity/QuestionContent';
import { UserTemplate } from './domain/entity/UserTemplate';
import { UserTemplateHelper } from './helper/UserTemplate.Helper';
import { UserTemplateDao } from './domain/repository/dao/UserTemplate.Dao';
import { TemplateController } from './presentation/Template.Controller';
import { TemplateService } from './service/Template.Service';
import { UserModule } from '../user/user.module';
import { UserApi } from './infrastructure/User.Api';
import { ChallengeApi } from './infrastructure/Challenge.Api';
import { ChallengeModule } from '../challenge/challenge.module';
import { QuestionContentDao } from './domain/repository/dao/QuestionContent.Dao';
import { UserTemplateTransaction } from './domain/repository/transaction/UserTemplate.Transaction';
import { QuestionContentHelper } from './helper/QuestionContent.Helper';
import { CommentService } from './service/Comment.Service';
import { CommentController } from './presentation/Comment.Controller';
import { CommentDao } from './domain/repository/dao/Comment.Dao';
import { CommentHelper } from './helper/Comment.Helper';
import { DataMapperService } from './domain/service/DataMappper.Service';
import { LikeController } from './presentation/Like.Controller';
import { LikeServie } from './service/Like.Service';
import { LikeHelper } from './helper/Like.Helper';
import { LikeDao } from './domain/repository/dao/Like.Dao';
import { TemplateVerifyService } from 'src/global/exception/template/TemplateVerify.Service';
import { UserVerifyService } from 'src/global/exception/user/UserVerify.Service';
import { AlarmService } from 'src/global/alarm/Alarm.Service';
import { CommentChecker } from './service/handler/implement/CommentChecker';
import { CommentEditor } from './service/handler/implement/CommentEditor';
import { CommentEraser } from './service/handler/implement/CommentEraser';
import { CommentRegistrant } from './service/handler/implement/CommentRegistrant';
import { Check } from 'typeorm';
import { MyCommentCollector } from './service/handler/implement/MyCommentCollector';
import { TemplateCommentCollector } from './service/handler/implement/TemplateCommentCollector';
import { LikeChecker } from './service/handler/implement/LikeChecker';
import { LikeCountCollector } from './service/handler/implement/LikeCountCollector';
import { LikeEraser } from './service/handler/implement/LikeEraser';
import { LikeRegistrant } from './service/handler/implement/LikeRegistrant';
import { LikePressUserCollector } from './service/handler/implement/LikePressUserCollector';
import { MyTemplateCollector } from './service/handler/implement/MyTemplateCollector';
import { TemplateEditor } from './service/handler/implement/TemplateEditor';
import { TemplateFetcher } from './service/handler/implement/TemplateFetcher';

import { TemplateQueryByDate } from './service/handler/implement/TemplateQueryByDate';
import { TemplateRegistrant } from './service/handler/implement/TemplateRegistrant';
import { TemplateNotifier } from './service/handler/implement/TemplateNotifier';

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
    TemplateService,
    CommentService,
    LikeServie,
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
