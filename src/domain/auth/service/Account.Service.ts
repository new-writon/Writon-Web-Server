
import { User } from "../../user/domain/entity/User";
import { TokenManager } from "../../../global/util/TokenManager";
import * as bcrypt from 'bcrypt';
import { MailManager } from "../../../global/util/MailManager";
import { UserIdentifier } from "../dto/response/UserIdentifier";
import { generateRandomPassword } from "../util/temporaryPassword";
import { Injectable } from "@nestjs/common";
import { UserApi } from "../intrastructure/User.Api";
import { AuthVerifyService } from "../domain/service/AuthVerify.Service";

@Injectable()
export class AccountService {

    constructor(
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,
        private readonly userApi: UserApi,
        private readonly authVerifyService: AuthVerifyService
    ) {}

    public async penetratelocalUser(identifier: string, password: string, email: string,): Promise<void> {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await this.userApi.requestLocalSignUp(identifier, encryptedPassword, email);
    }

    public async findIdentifier(email: string, code: string): Promise<UserIdentifier> {
        const userData : User = await this.userApi.requestUserByEmail(email,true);
        const certifyCode :string = await this.tokenManager.getToken(email);
        this.authVerifyService.verifyCode(code, certifyCode);
        return UserIdentifier.of(userData.getIdentifier());
    }

    public async generateTemporaryPassword(idenfitier:string, email:string): Promise<void> {
        const userData : User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(idenfitier,true);
        const newPassword = generateRandomPassword();
        await this.userApi.requestUpdatePassword(idenfitier, email, await bcrypt.hash(newPassword,10));
        this.mailManager.randomPasswordsmtpSender(email, newPassword);
    }

    public async changePassword(userId: number, oldPassword: string, newPassword:string): Promise<void> {
        const userData : User = await this.userApi.giveUserById(userId,true);
        await this.authVerifyService.verifyPassword(oldPassword, userData.getPassword());
        await this.userApi.executeUpdatePasswordByUserId(userId,await bcrypt.hash(newPassword,10))
    }



}