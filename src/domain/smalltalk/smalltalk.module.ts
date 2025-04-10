import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmallTalk } from './domain/entity/SmallTalk';
import { SmallTalkComment } from './domain/entity/SmallTalkComment';
import { SmallTalkController } from './presentation/SmallTalk.Controller';
import { SmallTalkCommentController } from './presentation/SmallTalkComment.Controller';
import { SmallTalkService } from './service/SmallTalk.Service';
import { SmallTalkCommentService } from './service/SmallTalkComment.Service';
import { SmallTalkHelper } from './helper/SmallTalk.Helper';
import { SmallTalkCommentHelper } from './helper/SmallTalkComment.Helper';
import { UserModule } from '../user/user.module';
import { SmallTalkDao } from './domain/repository/dao/SmallTalk.Dao';
import { SmallTalkCommentDao } from './domain/repository/dao/SmallTalkComment.Dao';
import { UserApi } from './infrastructure/User.Api';
import { SmallTalkVerifyService } from 'src/global/exception/smalltalk/SmallTalkVerify.Service';

@Module({
  imports: [TypeOrmModule.forFeature([SmallTalk, SmallTalkComment]), UserModule],
  providers: [
    { provide: 'smallTalkImpl', useClass: SmallTalkDao },
    { provide: 'smallTalkCommentImpl', useClass: SmallTalkCommentDao },
    SmallTalkService,
    SmallTalkCommentService,
    SmallTalkHelper,
    SmallTalkCommentHelper,
    UserApi,
    SmallTalkVerifyService,
  ],
  controllers: [SmallTalkController, SmallTalkCommentController],
  exports: [SmallTalkHelper, SmallTalkCommentHelper],
})
export class SmallTalkModule {}
