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

    public async requestAffiliationByUserIdAndOrganization(userId: number, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByUserIdWithOrganization(userId, organization, verifyFlag);
    }

    public async requestAffiliationByNicknameAndOrganization(nickname:string, organization: string, verifyFlag:boolean): Promise<Affiliation>{
        return this.affiliationHelper.giveAffiliationByNicknameAndOrganization(nickname, organization, verifyFlag);
    }

    public async requestUserChallengeByUserIdAndOrganizationAndChallengeId(userId: number, organization: string, challengeId: number, verifyFlag:boolean): Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeByUserIdAndOrganizationAndChallengeId(userId, organization, challengeId,verifyFlag)
    }

    public async requestUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId:number[], challengeId:number, verifyFlag:boolean):Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeByUserTemplateIdArrayAndChallengeId(userChallengeId, challengeId,verifyFlag);
    }

    public async requestAffilaitonWithChallengeIdArray(userChallengeId:number[], verifyFlag:boolean):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffilaitonWithChallengeIdArray(userChallengeId,verifyFlag)
    }

    public async requestAffilaitonWithChallengeIdAndUserChallengeId(challengeId:number, userChallengeId:number[], verifyFlag:boolean):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffilaitonWithChallengeIdAndUserChallengeId(challengeId, userChallengeId,verifyFlag);
    }

    public async requestUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId:number, userId:number, organization:string, verifyFlag:boolean):Promise<UserChallenge>{
        return this.userChallengeHelper.giveUserChallengeAndAffiliationByChallengeIdWithUserIdAndOrganization(challengeId, userId, organization,verifyFlag);
    }

    public async requestAffiliationById(affiliationId: number[], verifyFlag:boolean):Promise<Affiliation[]>{
        return this.affiliationHelper.giveAffiliationById(affiliationId, verifyFlag)
    }

    public async requestUserChallengeAndAffiliationAndUserByUserChallengeIdAndChallengeId(userChallengeId:number[], challengeId:number, verifyFlag:boolean):Promise<UserChallenge[]>{
        return this.userChallengeHelper.giveUserChallengeAndAffiliationAndUserByUserChallengeIdArrayAndChallengeId(userChallengeId, challengeId,verifyFlag);
    }

    public async requestAffiliationAndUserById(affiliationId: number[]):Promise<Affiliation[]>{
         // 검증 x
        return this.affiliationHelper.giveAffiliationAndUserById(affiliationId);
    }


}