import {  Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User';
import { UserHelper } from '../helper/User.Helper';
import { UserVerifyService } from '../../../global/exception/user/UserVerify.Service';


@Injectable()
export class UserService {
    constructor(
        private readonly userHelper: UserHelper,
        private readonly userVerifyService: UserVerifyService
    ) { }


    public async modifyAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        // 검증하기
        const userData = await this.userHelper.giveUserById(userId);
        this.userVerifyService.verifyUser(userData);
        await this.userHelper.executeUpdateAccount(accountNumber, bank, userId);
    }


}
