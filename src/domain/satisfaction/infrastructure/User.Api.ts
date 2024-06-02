import { Injectable } from "@nestjs/common";
import { UserChallengeHelper } from "../../user/helper/UserChallenge.Helper.js";
import { UserChallenge } from "../../user/domain/entity/UserChallenge.js";



@Injectable()
export class UserApi{

    constructor(
        private readonly userChallengeHelper: UserChallengeHelper
    ){}

    public async requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId:number, organization:string, challengeId:number):Promise<UserChallenge>{
        return this.userChallengeHelper.giveUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
    }

    public async requestUpdateUserChallengeReview(userId:number, organization:string, challengeId:number): Promise<void>{
        return this.userChallengeHelper.executeUpdateUserChallengeReview(userId, organization, challengeId);
    }


    
}