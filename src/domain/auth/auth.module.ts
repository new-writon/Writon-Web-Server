import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/Jwt.Strategy.js';
import { AuthConfig, auth } from './util/auth.js';
import { AuthController } from './presentation/Auth.Controller.js';
import { AuthService } from './service/Auth.Service.js';
import { UserDao } from '../user/domain/repository/dao/User.Dao.js';
import { SocialLogin } from './util/SocialLogin.js';
import { JwtManager } from './util/JwtManager.js';
import { TokenManager } from '../../global/util/TokenManager.js';
import { MailManager } from '../../global/util/MailManager.js';
import { UserHelper } from '../user/helper/User.Helper.js';
import { AffiliationHelper } from '../user/helper/Affiliation.Helper.js';
import { UserChallengeHelper } from '../user/helper/UserChallenge.Helper.js';
import { UserModule } from '../user/user.module.js';


@Module({
  imports: [
    ConfigModule.forFeature(auth),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<AuthConfig>) {
        return config.getOrThrow('jwt');
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    forwardRef(() => UserModule),
  ],
  providers: [
    JwtStrategy, AuthService, SocialLogin, JwtManager, TokenManager,
    MailManager
  ],
  controllers: [AuthController],
  exports:[
    SocialLogin,
    JwtManager
  ]
})
export class AuthModule {}
