import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmallTalk } from './domain/entity/SmallTalk.js';
import { SmallTalkComment } from './domain/entity/SmallTalkComment.js';
import { SmallTalkController } from './presentation/SmallTalk.Controller.js';
import { SmallTalkCommentController } from './presentation/SmallTalkComment.Controller.js';
import { SmallTalkService } from './service/SmallTalk.Service.js';
import { SmallTalkCommentService } from './service/SmallTalkComment.Service.js';
import { SmallTalkHelper } from './helper/SmallTalk.Helper.js';
import { SmallTalkCommentHelper } from './helper/SmallTalkComment.Helper.js';
import { UserModule } from '../user/user.module.js';
import { SmallTalkDao } from './domain/repository/dao/SmallTalk.Dao.js';
import { SmallTalkCommentDao } from './domain/repository/dao/SmallTalkComment.Dao.js';
import { UserApi } from './infrastructure/User.Api.js';
import { SmallTalkVerifyService } from './domain/service/SmallTalkVerify.Service.js';



@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SmallTalk, SmallTalkComment],
    ),
    UserModule

  
  ],
  providers:[
    {provide: 'smallTalkImpl',  useClass: SmallTalkDao},
    {provide: 'smallTalkCommentImpl',  useClass: SmallTalkCommentDao},
    SmallTalkService,
    SmallTalkCommentService,
    SmallTalkHelper,
    SmallTalkCommentHelper,
    UserApi,
    SmallTalkVerifyService
    
  ],
  controllers: [SmallTalkController, SmallTalkCommentController],
  exports:[SmallTalkHelper, SmallTalkCommentHelper]
})
export class SmallTalkModule {}
