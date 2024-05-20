
import { User } from "../../user/domain/entity/User.js";
import { AuthException } from "../exception/AuthException.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { checkData } from "../util/checker.js";
import { Injectable } from "@nestjs/common";
import { UserHelper } from "../../../domain/user/helper/User.Helper.js";


@Injectable()
export class DuplicationCheckService {
    constructor(

        private readonly userHelper: UserHelper
    ) {}

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userHelper.giveUserDataBySocialNumberOrIdentifier(identifier);
        this.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userHelper.giveUserByEmail(email);
        this.validateEmail(userData);   
    }


    private validateIdentifier(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_IDENTIFIER);
        }
    }

    private validateEmail(userData: User){
        if(checkData(userData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_EMAIL);
        }
    }
}