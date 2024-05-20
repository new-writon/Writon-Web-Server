
import { User } from "../../user/domain/entity/User.js";
import { AuthException } from "../exception/AuthException.js";
import { AuthErrorCode } from "../exception/AuthErrorCode.js";
import { checkData } from "../util/checker.js";
import { Injectable } from "@nestjs/common";
import { UserHelper } from "../../../domain/user/helper/User.Helper.js";
import { AffiliationApi } from "../intrastructure/Affiliation.Api.js";
import { Affiliation } from "../../user/domain/entity/Affiliation.js";


@Injectable()
export class DuplicationCheckService {
    constructor(

        private readonly userHelper: UserHelper,
        private readonly affiliatinApi: AffiliationApi
    ) {}

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userHelper.giveUserDataBySocialNumberOrIdentifier(identifier);
        this.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userHelper.giveUserByEmail(email);
        this.validateEmail(userData);   
    }

    public async checkDuplicateNickname(nickname: string, organization:string): Promise<void> {
        const affiliationData : Affiliation = await this.affiliatinApi.requestAffiliationByNicknameAndOrganization(nickname, organization);
        this.validateNickname(affiliationData);   
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

    private validateNickname(affiliationData: Affiliation){
        if(checkData(affiliationData)){
            throw new AuthException(AuthErrorCode.INVALIDATE_NICKNAME);
        }
    }
}