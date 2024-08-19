import {  Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User';
import { checkData } from '../../auth/util/checker';
import { UserErrorCode } from '../exception/UserErrorCode';
import { UserException } from '../exception/UserException';
import { UserHelper } from '../helper/User.Helper';


@Injectable()
export class UserService {
    constructor(
        private readonly userHelper: UserHelper
    ) { }


    public async modifyAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
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
