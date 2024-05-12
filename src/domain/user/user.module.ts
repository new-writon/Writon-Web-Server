import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserController } from './presentation/User.Controller.js';
import { User } from './domain/entity/User.js';
import { UserService } from './service/User.Service.js';
import { Affiliation } from './domain/entity/Affiliation.js';
import { Organization } from './domain/entity/Organization.js';
import { UserChallenge } from './domain/entity/UserChallenge.js';
import { UserDao } from './domain/repository/dao/User.Dao.js';
import { TokenManager } from '../../global/util/TokenManager.js';
import { MailManager } from '../../global/util/MailManager.js';
import { AuthService } from '../auth/service/Auth.Service.js';
import { UserChallengeController } from './presentation/UserChallenge.Controller.js';
import { UserChallengeService } from './service/UserChallenge.Service.js';
import { AffiliationDao } from './domain/repository/dao/Affiliation.Dao.js';
import { UserTemplateHelper } from '../template/helper/UserTemplate.Helper.js';
import { UserChallengeDao } from './domain/repository/dao/UserChallenge.Dao.js';
import { UserTemplateDao } from '../template/domain/repository/dao/UserTemplate.Dao.js';
import { AuthModule } from '../auth/auth.module.js';
import { TemplateModule } from '../template/template.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Affiliation, Organization, UserChallenge]),
    AuthModule,
    TemplateModule



  ],
  providers: [
    UserService, 
    {
      provide: 'impluser', useClass: UserDao, // provide에 문자열 토큰 지정
    }, 
    {
      provide: 'implaffiliation', useClass: AffiliationDao, // provide에 문자열 토큰 지정
    },
    {
      provide: 'impluserchallenge', useClass: UserChallengeDao, // provide에 문자열 토큰 지정
    },
    TokenManager, 
    MailManager,
    AuthService, 
    UserChallengeService, 
  ],
  controllers: [UserController, UserChallengeController],
})
export class UserModule { }
