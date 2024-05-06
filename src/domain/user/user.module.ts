import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserController } from './presentation/User.Controller.js';
import { User } from './domain/entity/User.js';
import { UserService  } from './service/User.Service.js';
import { Affiliation } from './domain/entity/Affiliation.js';
import { Organization } from './domain/entity/Organization.js';
import { UserChallenge } from './domain/entity/UserChallenge.js';
import { UserDao } from './domain/repository/dao/User.Dao.js';
import { TokenManager } from '../../global/util/TokenManager.js';
import { MailManager } from '../../global/util/MailManager.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Affiliation, Organization, UserChallenge]),

  
  ],
  providers: [
    UserService, {
      provide: 'impl',  useClass: UserDao, // provide에 문자열 토큰 지정
    }, TokenManager, MailManager
  ],
  controllers: [UserController],
})
export class UserModule {}
