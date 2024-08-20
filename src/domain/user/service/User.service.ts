import {  Injectable } from '@nestjs/common';
import { User } from '../domain/entity/User';
import { checkData } from '../../auth/util/checker';
import { UserErrorCode } from '../exception/UserErrorCode';
import { UserException } from '../exception/UserException';
import { UserHelper } from '../helper/User.Helper';
import { UserVerifyService } from '../domain/service/UserVerify.Service';


@Injectable()
export class UserService {
    constructor(
        private readonly userHelper: UserHelper,
        private readonly userVerifyService: UserVerifyService
    ) { }


    public async modifyAccount(accountNumber:string, bank:string, userId:number):Promise<void>{
        const userData:User = await this.userHelper.giveUserById(userId);
        this.userVerifyService.verifyUser(userData);
        await this.userHelper.executeUpdateAccount(accountNumber, bank, userId);
    }


}
