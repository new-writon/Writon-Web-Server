
import { User } from "../../user/domain/entity/User";
import { Injectable } from "@nestjs/common";
import { Affiliation } from "../../user/domain/entity/Affiliation";
import { UserApi } from "../intrastructure/User.Api";
import { AuthVerifyService } from "../domain/service/AuthVerify.Service";


@Injectable()
export class DuplicationCheckService {
    constructor(
        private readonly userApi: UserApi,
        private readonly authVerifyService: AuthVerifyService
    ) {}

    public async checkDuplicateIdentifier(identifier: string): Promise<void> {
        const userData : User = await this.userApi.requestUserDataBySocialNumberOrIdentifier(identifier);
        this.authVerifyService.validateIdentifier(userData);   
    }

    public async checkDuplicateEmail(email: string): Promise<void> {
        const userData : User = await this.userApi.requestUserByEmail(email);
        this.authVerifyService.validateEmail(userData);   
    }

    public async checkDuplicateNickname(nickname: string, organization:string): Promise<void> {
        const affiliationData : Affiliation = await this.userApi.requestAffiliationByNicknameAndOrganization(nickname, organization);
        this.authVerifyService.validateNickname(affiliationData);   
    }


}