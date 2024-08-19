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
import { TemplateVerifyService } from './domain/service/TemplateVerify.Service';




@Module({
  imports: [
 
    TypeOrmModule.forFeature([Comment, Likes, QuestionContent, UserTemplate]),
    forwardRef(() => UserModule),
    ChallengeModule
  ],
  providers: [
    {provide: 'usertemplateImpl',  useClass: UserTemplateDao}, 
    {provide: 'questionContentImpl',  useClass: QuestionContentDao}, 
    {provide: 'commentImpl',  useClass: CommentDao}, 
    {provide: 'likeImpl',  useClass: LikeDao}, 
    UserTemplateHelper, LikeHelper, QuestionContentHelper, CommentHelper, 
    UserApi, ChallengeApi, 
    TemplateService, CommentService, LikeServie, DataMapperService,
    UserTemplateTransaction, TemplateVerifyService
  ],
  controllers: [TemplateController, CommentController, LikeController],
  exports:[
    UserTemplateHelper,
  
  ]
})
export class TemplateModule {}
