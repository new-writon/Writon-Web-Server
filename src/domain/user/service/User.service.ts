import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { UserException } from '../exception/UserException.js';
import { UserErrorCode } from '../exception/UserErrorCode.js';
import { UserIdentifier } from '../dto/response/UserIdentifier.js';
import { TokenManager } from '../../../global/util/TokenManager.js';
import {generateRandomPassword} from '../util/temporaryPassword.js';
import { MailManager } from '../../../global/util/MailManager.js';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject('impl')
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager,
        private readonly mailManager: MailManager
    ) { }


    public async test(userId: number): Promise<string> {
        const results : User = await this.userRepository.selectUserById(userId);
        return 'Good'
    }

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(identifier);
        this.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataByEmail(email);
        this.validateEmail(userData);   
    }


    public async findIdentifier(email: string, code: string): Promise<UserIdentifier> {
        const userData : User = await this.userRepository.findUserByEmail(email);
        this.verifyUser(userData);
        const certifyCode :string = await this.tokenManager.getToken(email);
        this.verifyCode(code, certifyCode);
        return UserIdentifier.of(userData.getIdentifier());
  
    }

    public async generateTemporaryPassword(idenfitier:string, email:string): Promise<void> {
        const userData : User = await this.userRepository.selectUserDataBySocialNumberOrIdentifier(idenfitier);
        this.validateIdentifier(userData);
        this.verifyEmail(userData, email);
        const newPassword = generateRandomPassword();
        await this.userRepository.updatePassword(idenfitier, email, await bcrypt.hash(newPassword,10));
        this.mailManager.randomPasswordsmtpSender(email, newPassword);
    }


 
    private verifyCode(code: string, certifyCode: string){
        if(code != certifyCode)
            throw new UserException(UserErrorCode.NOT_VERIFY_CODE);

    }


    private verifyUser(user: User){
        if(!this.checkData(user))
            throw new UserException(UserErrorCode.NOT_VERIFY_EMAIL);
    }

     /**
     * 
     * @param data 
     * @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
     */
     private checkData(data: any): boolean {
        let result = true
        if (!data) {   // 데이터가 없을 경우
            return result = false;
        }
        return result;
    }

    private validateIdentifier(userData: User){
        if(!this.checkData(userData)){
            throw new UserException(UserErrorCode.INVALIDATE_IDENTIFIER);
        }
    }

    private validateEmail(userData: User){
        if(!this.checkData(userData)){
            throw new UserException(UserErrorCode.INVALIDATE_EMAIL);
        }
    }

    private verifyEmail(userData: User, email: string){
        if(userData.getEmail() !== email)
            throw new UserException(UserErrorCode.NOT_VERIFY_EMAIL);
    }



}
