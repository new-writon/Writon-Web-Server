import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthConfig, auth } from './util/auth';
import { AuthController } from './presentation/Auth.Controller';
import { AuthService } from './service/Auth.Service';
import { SocialLogin } from './util/SocialLogin';
import { JwtManager } from './util/JwtManager';
import { TokenManager } from '../../global/util/TokenManager';
import { MailManager } from '../../global/util/MailManager';
import { UserModule } from '../user/user.module';
import { AccountController } from './presentation/Account.Controller';
import { VerificationController } from './presentation/Verification.Controller';
import { DuplicationCheckController } from './presentation/DuplicationCheck.Controller';
import { AccountService } from './service/Account.Service';
import { DuplicationCheckService } from './service/DuplicationCheck.Service';
import { VerificationService } from './service/Verifiaction.Service';
import { UserApi } from './intrastructure/User.Api';

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
    MailManager, AccountService, DuplicationCheckService, VerificationService, UserApi
  ],
  controllers: [AuthController, AccountController, VerificationController, DuplicationCheckController],
  exports:[
    SocialLogin,
    JwtManager
  ]
})
export class AuthModule {}
