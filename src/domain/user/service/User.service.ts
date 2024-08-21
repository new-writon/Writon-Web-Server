import {  Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User';
import { UserHelper } from '../helper/User.Helper';
import { UserVerifyService } from '../domain/service/UserVerify.Service';


@Injectable()
export class UserService {
    constructor(
        private readonly userHelper: UserHelper,
        private readonly userVerifyService: UserVerifyService
    ) { }


    public async modifyAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        await this.userHelper.giveUserById(userId,true);
        await this.userHelper.executeUpdateAccount(accountNumber, bank, userId);
    }


}
