import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/Jwt.Strategy.js';
import { AuthConfig, auth } from './util/auth.js';
import { AuthController } from './presentation/Auth.Controller.js';
import { AuthService } from './service/Auth.Service.js';
import { SocialLogin } from './util/SocialLogin.js';
import { JwtManager } from './util/JwtManager.js';
import { TokenManager } from '../../global/util/TokenManager.js';
import { MailManager } from '../../global/util/MailManager.js';
import { UserModule } from '../user/user.module.js';
import { AccountController } from './presentation/Account.Controller.js';
import { VerificationController } from './presentation/Verification.Controller.js';
import { DuplicationCheckController } from './presentation/DuplicationCheck.Controller.js';
import { AccountService } from './service/Account.Service.js';
import { DuplicationCheckService } from './service/DuplicationCheck.Service.js';
import { VerificationService } from './service/Verifiaction.Service.js';
import { AffiliationApi } from './intrastructure/Affiliation.Api.js';


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
    MailManager, AccountService, DuplicationCheckService, VerificationService, AffiliationApi
  ],
  controllers: [AuthController, AccountController, VerificationController, DuplicationCheckController],
  exports:[
    SocialLogin,
    JwtManager
  ]
})
export class AuthModule {}
