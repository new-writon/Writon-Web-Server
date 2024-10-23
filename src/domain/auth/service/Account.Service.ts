import { User } from '../../user/domain/entity/User';
import * as bcrypt from 'bcryptjs';
import { MailManager } from '../../../global/util/MailManager';
import { UserIdentifier } from '../dto/response/UserIdentifier';
import { generateRandomPassword } from '../util/temporaryPassword';
import { Injectable } from '@nestjs/common';
import { UserApi } from '../intrastructure/User.Api';
import { AuthVerifyService } from '../../../global/exception/auth/AuthVerify.Service';
import { LoginTokenManager } from '../util/LoginTokenManager';

@Injectable()
export class AccountService {
  constructor(
    private readonly loginTokenManager: LoginTokenManager,
    private readonly mailManager: MailManager,
    private readonly userApi: UserApi,
    private readonly authVerifyService: AuthVerifyService,
  ) {}

  public async penetratelocalUser(
    identifier: string,
    password: string,
    email: string,
  ): Promise<void> {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await this.userApi.requestLocalSignUp(identifier, encryptedPassword, email);
  }

  public async findIdentifier(
    email: string,
    code: string,
  ): Promise<UserIdentifier> {
    // 검증하기
    const userData: User = await this.userApi.requestUserByEmail(email);
    this.authVerifyService.verifyUser(userData);
    const certifyCode: string = (await this.loginTokenManager.getToken(
      email,
    )) as string;
    this.authVerifyService.verifyCode(code, certifyCode);
    return UserIdentifier.of(userData.getIdentifier());
  }

  public async generateTemporaryPassword(
    idenfitier: string,
    email: string,
  ): Promise<void> {
    // 검증하기
    const userData: User =
      await this.userApi.requestUserDataBySocialNumberOrIdentifier(idenfitier);
    this.authVerifyService.verifyUser(userData);
    const newPassword = generateRandomPassword();
    await this.userApi.requestUpdatePassword(
      idenfitier,
      email,
      await bcrypt.hash(newPassword, 10),
    );
    this.mailManager.randomPasswordsmtpSender(email, newPassword);
  }

  public async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    // 검증하기
    const userData: User = await this.userApi.giveUserById(userId);
    this.authVerifyService.verifyUser(userData);
    await this.authVerifyService.verifyPassword(
      oldPassword,
      userData.getPassword(),
    );
    await this.userApi.executeUpdatePasswordByUserId(
      userId,
      await bcrypt.hash(newPassword, 10),
    );
  }
}
