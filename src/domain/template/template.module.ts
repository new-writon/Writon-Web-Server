import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './domain/entity/Comment.js';
import { Likes } from './domain/entity/Likes.js';
import { QuestionContent } from './domain/entity/QuestionContent.js';
import { UserTemplete } from './domain/entity/UserTemplete.js';
import { UserTemplateHelper } from './helper/UserTemplate.Helper.js';
import { UserTemplateDao } from './domain/repository/dao/UserTemplate.Dao.js';
import { TemplateController } from './presentation/Template.Controller.js';
import { TemplateService } from './service/Template.Service.js';
import { UserModule } from '../user/user.module.js';
import { UserApi } from './infrastructure/User.Api.js';
import { ChallengeApi } from './infrastructure/Challenge.Api.js';
import { ChallengeModule } from '../challenge/challenge.module.js';
import { QuestionContentDao } from './domain/repository/dao/QuestionContent.Dao.js';
import { UserTemplateTransaction } from './domain/repository/transaction/UserTemplate.Transaction.js';
import { QuestionContentHelper } from './helper/QuestionContent.Helper.js';
import { CommentService } from './service/Comment.Service.js';
import { CommentController } from './presentation/Comment.Controller.js';
import { CommentDao } from './domain/repository/dao/Comment.Dao.js';
import { CommentHelper } from './helper/Comment.Helper.js';
import { DataMapperService } from './domain/service/DataMappper.Service.js';




@Module({
  imports: [
 
    TypeOrmModule.forFeature([Comment, Likes, QuestionContent, UserTemplete]),
    forwardRef(() => UserModule),
    ChallengeModule
  ],
  providers: [
    {provide: 'usertemplateImpl',  useClass: UserTemplateDao}, 
    {provide: 'questionContentImpl',  useClass: QuestionContentDao}, 
    {provide: 'commentImpl',  useClass: CommentDao}, 
    UserTemplateHelper, UserApi, ChallengeApi, TemplateService, CommentService,
    UserTemplateTransaction,
    QuestionContentHelper,
    CommentHelper, DataMapperService
  
  

  ],
  controllers: [TemplateController, CommentController],
  exports:[
    UserTemplateHelper,
  
  ]
})
export class TemplateModule {}
