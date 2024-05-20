
import { User } from "../../user/domain/entity/User.js";
import { TokenManager } from "../../../global/util/TokenManager.js";
import bcrypt from 'bcrypt';
import { MailManager } from "../../../global/util/MailManager.js";
import { UserIdentifier } from "../dto/response/UserIdentifier.js";
import { generateRandomPassword } from "../util/temporaryPassword.js";
import { UserHelper } from "../../user/helper/User.Helper.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { checkData } from "../util/checker.js";
import { AuthException } from "../exception/AuthException.js";
import { verifyCode, verifyPassword, vefifyIdentifier } from "../util/checker.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountService {

    constructor(

        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager,
        private readonly userHelper: UserHelper,
    ) {}



    public async localSignUp(identifier: string, password: string, email: string,): Promise<void> {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await this.userHelper.executeLocalSignUp(identifier, encryptedPassword, email);
    }


    public async findIdentifier(email: string, code: string): Promise<UserIdentifier> {
        const userData : User = await this.userHelper.giveUserByEmail(email);
        this.verifyUser(userData);
        const certifyCode :string = await this.tokenManager.getToken(email);
        verifyCode(code, certifyCode);
        return UserIdentifier.of(userData.getIdentifier());
  
    }



    public async generateTemporaryPassword(idenfitier:string, email:string): Promise<void> {
        const userData : User = await this.userHelper.giveUserDataBySocialNumberOrIdentifier(idenfitier);
        vefifyIdentifier(userData);
        this.verifyEmail(userData, email);
        const newPassword = generateRandomPassword();
        await this.userHelper.executeUpdatePassword(idenfitier, email, await bcrypt.hash(newPassword,10));
        this.mailManager.randomPasswordsmtpSender(email, newPassword);
    }

    public async changePassword(userId: number, oldPassword: string, newPassword:string): Promise<void> {
        const userData : User = await this.userHelper.giveUserById(userId);
        await verifyPassword(oldPassword, userData.getPassword());
        await this.userHelper.executeUpdatePasswordByUserId(userId,await bcrypt.hash(newPassword,10))
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