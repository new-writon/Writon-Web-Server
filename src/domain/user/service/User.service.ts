import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { UserException } from '../exception/UserException.js';
import { UserErrorCode } from '../exception/UserErrorCode.js';

@Injectable()
export class UserService {
    constructor(
        @Inject('impl')
        private readonly userRepository: UserRepository
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
        if(this.checkData(userData)){
            throw new UserException(UserErrorCode.INVALIDATE_IDENTIFIER);
        }
    }

    private validateEmail(userData: User){
        if(this.checkData(userData)){
            throw new UserException(UserErrorCode.INVALIDATE_EMAIL);
        }
    }



}
