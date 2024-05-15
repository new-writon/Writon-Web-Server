import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { TemplateContent } from './dto/response/TemplateContent.js';




@Module({
  imports: [
 
    TypeOrmModule.forFeature([Comment, Likes, QuestionContent, UserTemplete]),
    forwardRef(() => UserModule),
  ],
  providers: [
    {
    provide: 'usertemplateImpl',  useClass: UserTemplateDao, // provide에 문자열 토큰 지정
    }, 
    UserTemplateHelper,
    TemplateService,
  
  

  ],
  controllers: [TemplateController],
  exports:[
    UserTemplateHelper,
  
  ]
})
export class TemplateModule {}
