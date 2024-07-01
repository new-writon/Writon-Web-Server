import {  Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User.js';
import { checkData } from '../../auth/util/checker.js';
import { UserErrorCode } from '../exception/UserErrorCode.js';
import { UserException } from '../exception/UserException.js';
import { UserHelper } from '../helper/User.Helper.js';


@Injectable()
export class UserService {
    constructor(
        // @Inject('userImpl')
        // private readonly userRepository: UserRepository,
        private readonly userHelper: UserHelper
    ) { }


    public async test(userId: number): Promise<string> {
        const results : User = await this.userHelper.giveUserById(userId);
        return 'Good'
    }

    public async updateAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        const userData:User = await this.userHelper.giveUserById(userId);
        this.verifyUser(userData);
        await this.userHelper.executeUpdateAccount(accountNumber, bank, userId);
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
