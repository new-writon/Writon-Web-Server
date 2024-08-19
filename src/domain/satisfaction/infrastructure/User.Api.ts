import { Injectable } from "@nestjs/common";
import { UserChallengeHelper } from "../../user/helper/UserChallenge.Helper";
import { UserChallenge } from "../../user/domain/entity/UserChallenge";
import { AffiliationHelper } from "../../user/helper/Affiliation.Helper";
import { Affiliation } from "../../user/domain/entity/Affiliation";



@Injectable()
export class UserApi{

    constructor(
        private readonly userChallengeHelper: UserChallengeHelper,
        private readonly affiliatinHelper: AffiliationHelper,

    ){}

    public async requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number):Promise<UserChallenge>{
        return this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
    }

    public async requestUpdateUserChallengeReview(userId:number, organization:string, challengeId:number): Promise<void>{
        return this.userChallengeHelper.executeUpdateUserChallengeReview(userId, organization, challengeId);
    }

    public async requestUpdateUserChallengeReEngagement(userId:number, organization:string, challengeId:number, check:boolean): Promise<void>{
        return this.userChallengeHelper.executeUpdateUserChallengeReEngagement(userId, organization, challengeId, check);
    }

    public async requestAffiliationByUserIdWithOrganization(userId:number, organization:string):Promise<Affiliation>{
        return this.affiliatinHelper.giveAffiliationByUserIdWithOrganization(userId, organization);
    }

    public async requestUserChallengeByAffiliationIdAndChallengeId(affiliationId: number, challengeId: number):Promise<UserChallenge>{
        return this.userChallengeHelper.giveUserChallengeByAffiliationIdAndChallengeId(affiliationId, challengeId)
    }
}