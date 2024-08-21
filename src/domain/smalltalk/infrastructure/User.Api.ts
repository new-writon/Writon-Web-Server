import { Injectable } from "@nestjs/common";
import { Affiliation } from "../../user/domain/entity/Affiliation";
import { AffiliationHelper } from "../../user/helper/Affiliation.Helper";
import { UserChallengeHelper } from "../../user/helper/UserChallenge.Helper";
import { UserChallenge } from "../../user/domain/entity/UserChallenge";


@Injectable()
export class UserApi {

    constructor(
        private readonly affiliationHelper: AffiliationHelper,
        private readonly userChallengeHelper: UserChallengeHelper
    ){}

    public async requestAffiliationByUserIdAndOrganization(userId: number, organization: string): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization, false);
    }

    public async requestAffiliationByNicknameAndOrganization(nickname:string, organization: string): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByNicknameAndOrganization(nickname, organization, false);
    }

    public async requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId: number, organization: string, challengeId: number): Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId,false)
    }

    public async requestUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId, challengeId,false);
    }

    public async requestAffilaitonWithChallengeIdArray(userChallengeId:number[]):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffilaitonWithChallengeIdArray(userChallengeId,false)
    }

    public async requestAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[]):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeId,false);
    }

    public async requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId:number, userId:number, organization:string):Promise<UserChallenge>{
        return this.userChallengeHelper.giveUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization,true);
    }

    public async requestAffiliationById(affiliationId: number[]):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffiliationById(affiliationId, false)
    }

    public async requestUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(userChallengeId:number[], challengeId:number):Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeAndAffiliationAndUserByUserChallengeIdArrayAndChallengeId(userChallengeId, challengeId,false);
    }

    public async requestAffiliationAndUserById(affiliationId: number[]):Promise<Affiliation[]>{
         // 검증 x
        return this.affiliationHelper.giveAffiliationAndUserById(affiliationId);
    }


}