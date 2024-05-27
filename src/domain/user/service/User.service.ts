import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { UserRepository } from '../domain/repository/User.Repository.js';
import { checkData } from '../../../domain/auth/util/checker.js';
import { UserErrorCode } from '../exception/UserErrorCode.js';
import { UserException } from '../exception/UserException.js';


@Injectable()
export class UserService {
    constructor(
        @Inject('userImpl')
        private readonly userRepository: UserRepository,
    ) { }


    public async test(userId: number): Promise<string> {
        const results : User = await this.userRepository.selectUserById(userId);
        return 'Good'
    }

    public async updateAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        const userData:User = await this.userRepository.selectUserById(1000);
        this.verifyUser(userData);
        await this.userRepository.updateAccount(accountNumber, bank, userId);
    }

    /**
     * 
     * @param user 
     * @returns 유저 정보가 없을 시 에러를 터뜨린다.
     */
    private verifyUser(user:User){
        if(!checkData(user))     // 유저 정보가 없을 시 
            throw new UserException(UserErrorCode.NOT_FOUND_USER);  
    }
}
