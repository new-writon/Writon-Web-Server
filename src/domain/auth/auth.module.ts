import { Module, forwardRef } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './presentation/Auth.Controller';
import { AuthService } from './service/Auth.Service';
import { SocialLogin } from './util/SocialLogin';
import { JwtManager } from './util/JwtManager';
import { MailManager } from '../../global/util/MailManager';
import { UserModule } from '../user/user.module';
import { AccountController } from './presentation/Account.Controller';
import { VerificationController } from './presentation/Verification.Controller';
import { DuplicationCheckController } from './presentation/DuplicationCheck.Controller';
import { AccountService } from './service/Account.Service';
import { DuplicationCheckService } from './service/DuplicationCheck.Service';
import { VerificationService } from './service/Verifiaction.Service';
import { UserApi } from './intrastructure/User.Api';
import { CacheImpl } from 'src/global/util/CacheImpl';
import { LoginTokenManager } from './util/LoginTokenManager';
import { AuthVerifyService } from '../../global/exception/auth/AuthVerify.Service';
import { AuthValidateService } from '../../global/exception/auth/AuthValidate.Service';
import { ChallengeModule } from '../challenge/challenge.module';
import { ChallengeApi } from './intrastructure/Challenge.Api';

@Module({
  imports: [forwardRef(() => UserModule), ChallengeModule],
  providers: [
    JwtStrategy,
    AuthService,
    SocialLogin,
    JwtManager,
    LoginTokenManager,
    MailManager,
    AccountService,
    DuplicationCheckService,
    VerificationService,
    UserApi,
    ChallengeApi,
    CacheImpl,
    AuthVerifyService,
    AuthValidateService,
  ],
  controllers: [
    AuthController,
    AccountController,
    VerificationController,
    DuplicationCheckController,
  ],
  exports: [SocialLogin, JwtManager, AuthVerifyService, AuthValidateService, ChallengeApi],
})
export class AuthModule {}
