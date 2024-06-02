import { Module } from '@nestjs/common';
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
import { UserChallengeDao } from './domain/repository/dao/UserChallenge.Dao.js';
import { AuthModule } from '../auth/auth.module.js';
import { TemplateModule } from '../template/template.module.js';
import { ChallengeModule } from '../challenge/challenge.module.js';
import { UserChallengeHelper } from './helper/UserChallenge.Helper.js';
import { AffiliationHelper } from './helper/Affiliation.Helper.js';
import { UserHelper } from './helper/User.Helper.js';
import { ChallengeApi } from './infrastruture/Challenge.Api.js';
import { TemplateApi } from './infrastruture/Template.Api.js';
import { UserApi } from '../auth/intrastructure/User.Api.js';
import { OrganizationDao } from './domain/repository/dao/Organization.Dao.js';
import { AffiliationService } from './service/Affiliation.Service.js';
import { AffiliationController } from './presentation/Affiliation.Controller.js';
import { OrganizationHelper } from './helper/Organization.Helper.js';
import { DataMapperService } from './domain/service/DataMapper.Service.js';
import { UserVerifyService } from './domain/service/UserVerify.Service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Affiliation, Organization, UserChallenge]),
    AuthModule,
    TemplateModule,
    ChallengeModule



  ],
  providers: [
    UserService, 
    {provide: 'userImpl', useClass: UserDao}, 
    {provide: 'affiliationImpl', useClass: AffiliationDao},
    {provide: 'userchallengeImpl', useClass: UserChallengeDao},
    {provide: 'organizationImpl', useClass: OrganizationDao},
    TokenManager, 
    MailManager,
    AuthService, 
    UserChallengeService, 
    AffiliationService,
    UserChallengeHelper,
    AffiliationHelper,
    OrganizationHelper,
    UserHelper,
    ChallengeApi,
    TemplateApi,
    UserApi,
    DataMapperService,
    UserVerifyService
  ],

  controllers:[UserController, UserChallengeController, AffiliationController],
  exports:[UserChallengeHelper, AffiliationHelper, UserHelper]
})
export class UserModule {}
