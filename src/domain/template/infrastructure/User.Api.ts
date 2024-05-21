import { Injectable } from "@nestjs/common";
import { Affiliation } from "../../../domain/user/domain/entity/Affiliation.js";
import { AffiliationHelper } from "../../../domain/user/helper/Affiliation.Helper.js";


@Injectable()
export class UserApi {

    constructor(
        private readonly affiliationHelper: AffiliationHelper
    ){}

    public async requestAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByUserIdAndOrganization(userId, organization);
    }

    public async requestAffiliationByNicknameAndOrganization(nickname:string, organization: string): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByNicknameAndOrganization(nickname, organization);
    }

}