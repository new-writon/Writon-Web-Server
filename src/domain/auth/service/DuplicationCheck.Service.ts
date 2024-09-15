
import { User } from "../../user/domain/entity/User";
import { Injectable } from "@nestjs/common";
import { Affiliation } from "../../user/domain/entity/Affiliation";
import { UserApi } from "../intrastructure/User.Api";
import { AuthVerifyService } from "../../../global/exception/auth/AuthVerify.Service";
import { AuthValidateService } from "../../../global/exception/auth/AuthValidate.Service";


@Injectable()
export class DuplicationCheckService {
    constructor(
        private readonly userApi: UserApi,
        private readonly authValidateService: AuthValidateService
    ) {}

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(identifier);
        this.authValidateService.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userApi.requestUserByEmail(email);
        this.authValidateService.validateEmail(userData);   
    }

    public async checkDuplicateNickname(nickname: string, organization:string): Promise<void> {
        const affiliationData : Affiliation = await this.userApi.requestAffiliationByNicknameAndOrganization(nickname, organization);
        this.authValidateService.validateNickname(affiliationData);   
    }


}