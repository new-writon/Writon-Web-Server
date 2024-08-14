import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmallTalk } from './domain/entity/SmallTalk.js';
import { SmallTalkComment } from './domain/entity/SmallTalkComment.js';
import { AgoraController } from './presentation/Agora.Controller.js';
import { AgoraCommentController } from './presentation/AgoraComment.Controller.js';
import { AgoraService } from './service/SmallTalk.Service.js';
import { AgoraCommentService } from './service/SmallTalkComment.Service.js';
import { AgoraHelper } from './helper/SmallTalk.Helper.js';
import { AgoraCommentHelper } from './helper/SmallTalkComment.Helper.js';
import { UserModule } from '../user/user.module.js';
import { AgoraDao } from './domain/repository/dao/SmallTalk.Dao.js';
import { AgoraCommentDao } from './domain/repository/dao/SmallTalkComment.Dao.js';
import { UserApi } from './infrastructure/User.Api.js';
import { AgoraVerifyService } from './domain/service/AgoraVerify.Service.js';



@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SmallTalk, SmallTalkComment],
    ),
    UserModule

  
  ],
  providers:[
    {provide: 'agoraImpl',  useClass: AgoraDao},
    {provide: 'agoraCommentImpl',  useClass: AgoraCommentDao},
    AgoraService,
    AgoraCommentService,
    AgoraHelper,
    AgoraCommentHelper,
    UserApi,
    AgoraVerifyService
    
  ],
  controllers: [AgoraController, AgoraCommentController],
  exports:[AgoraHelper, AgoraCommentHelper]
})
export class SmallTalkModule {}
