import { Injectable } from '@nestjs/common';
import { JwtManager } from '../util/JwtManager';
import { AuthenticationCodeResponse } from '../dto/response/AuthenticationCodeResponse';
import random from '../util/random';
import { MailManager } from '../../../global/util/MailManager';
import { Token } from '../dto/response/Token';
import { AuthVerifyService } from '../../../global/exception/auth/AuthVerify.Service';
import { LoginTokenManager } from '../util/LoginTokenManager';

@Injectable()
export class VerificationService {
  constructor(
    private readonly jwtManager: JwtManager,
    private readonly loginTokenManager: LoginTokenManager,
    private readonly mailManager: MailManager,
    private readonly authVerifyService: AuthVerifyService,
  ) {}

  public async reissueToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<Token> {
    const accessTokenVerifyResult = this.jwtManager.verify(
      accessToken.split('Bearer ')[1],
    );
    const accessTokenDecodedData = this.jwtManager.decode(
      accessToken.split('Bearer ')[1],
    );
    const refreshTokenVerifyesult = await this.jwtManager.refreshVerify(
      refreshToken,
      accessTokenDecodedData.userId,
    );
    console.log(refreshTokenVerifyesult);
    this.authVerifyService.signVerifyToken(
      accessTokenVerifyResult.state,
      refreshTokenVerifyesult.state,
    );
    const newAccessToken = this.jwtManager.makeAccessToken(
      accessTokenDecodedData.userId,
      accessTokenDecodedData.role,
    );
    return Token.of(newAccessToken, refreshTokenVerifyesult.token as string);
  }

  public async issueAuthenticationCode(
    email: string,
  ): Promise<AuthenticationCodeResponse> {
    const verificationCode = random.generateRandom(100000, 999999);
    await this.loginTokenManager.setToken(
      email,
      String(verificationCode),
      180000,
    );
    await this.mailManager.sendCodeEmail(email, verificationCode);
    return AuthenticationCodeResponse.of(verificationCode);
  }

  public async verifyAuthenticationCode(
    email: string,
    code: string,
  ): Promise<void> {
    const authenticationCode: string = (await this.loginTokenManager.getToken(
      email,
    )) as string;
    this.authVerifyService.verifyCode(code, authenticationCode);
  }
}
