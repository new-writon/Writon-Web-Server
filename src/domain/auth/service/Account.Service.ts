
import { User } from "../../user/domain/entity/User";
import { TokenManager } from "../../../global/util/TokenManager";
import * as bcrypt from 'bcrypt';
import { MailManager } from "../../../global/util/MailManager";
import { UserIdentifier } from "../dto/response/UserIdentifier";
import { generateRandomPassword } from "../util/temporaryPassword";
import { AuthErrorCode } from "../exception/AuthErrorCode";
import { checkData } from "../util/checker";
import { AuthException } from "../exception/AuthException";
import { verifyCode, verifyPassword, vefifyIdentifier } from "../util/checker";
import { Injectable } from "@nestjs/common";
import { UserApi } from "../intrastructure/User.Api";

@Injectable()
export class AccountService {

    constructor(
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,
        private readonly userApi: UserApi
    ) {}

    public async penetratelocalUser(identifier: string, password: string, email: string,): Promise<void> {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await this.userApi.requestLocalSignUp(identifier, encryptedPassword, email);
    }

    public async findIdentifier(email: string, code: string): Promise<UserIdentifier> {
        const userData : User = await this.userApi.requestUserByEmail(email);
        this.verifyUser(userData);
        const certifyCode :string = await this.tokenManager.getToken(email);
        verifyCode(code, certifyCode);
        return UserIdentifier.of(userData.getIdentifier());
    }

    public async generateTemporaryPassword(idenfitier:string, email:string): Promise<void> {
        const userData : User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(idenfitier);
        vefifyIdentifier(userData);
        this.verifyEmail(userData, email);
        const newPassword = generateRandomPassword();
        await this.userApi.requestUpdatePassword(idenfitier, email, await bcrypt.hash(newPassword,10));
        this.mailManager.randomPasswordsmtpSender(email, newPassword);
    }

    public async changePassword(userId: number, oldPassword: string, newPassword:string): Promise<void> {
        const userData : User = await this.userApi.giveUserById(userId);
        await verifyPassword(oldPassword, userData.getPassword());
        await this.userApi.executeUpdatePasswordByUserId(userId,await bcrypt.hash(newPassword,10))
    }

    private verifyUser(user: User){
        if(!checkData(user))
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }

    private verifyEmail(userData: User, email: string){
        if(userData.getEmail() !== email)
            throw new AuthException(AuthErrorCode.NOT_VERIFY_EMAIL);
    }

}