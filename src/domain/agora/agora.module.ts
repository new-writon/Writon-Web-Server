import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agora } from './domain/entity/Agora.js';
import { AgoraComment } from './domain/entity/AgoraComment.js';
import { AgoraController } from './presentation/Agora.Controller.js';
import { AgoraCommentController } from './presentation/AgoraComment.Controller.js';
import { AgoraService } from './service/Agora.Service.js';
import { AgoraCommentService } from './service/AgoraComment.Service.js';
import { AgoraHelper } from './helper/Agora.Helper.js';
import { AgoraCommentHelper } from './helper/AgoraComment.Helper.js';
import { UserModule } from '../user/user.module.js';
import { AgoraDao } from './domain/repository/dao/Agora.Dao.js';
import { AgoraCommentDao } from './domain/repository/dao/AgoraComment.Dao.js';
import { UserApi } from './infrastructure/User.Api.js';



@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Agora, AgoraComment],
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
    UserApi
    
  ],
  controllers: [AgoraController, AgoraCommentController],
  exports:[AgoraHelper, AgoraCommentHelper]
})
export class AgoraModule {}
