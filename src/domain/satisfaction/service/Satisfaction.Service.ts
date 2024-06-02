import { Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api.js";
import { SatisfactionStatus } from "../dto/response/SatisfactionSatus.js";


@Injectable()
export class SatisfactionService{

    constructor(
        private readonly userApi: UserApi
    ){}


    public async bringSatisfactionStatus(
        userId:number,
        organization:string,
        challengeId:number
    ){
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        return SatisfactionStatus.of(userChallengeData.getReview());
    }


    public async updateSatisfactionStatus(
        userId:number,
        organization:string,
        challengeId:number
    ){
       await this.userApi.requestUpdateUserChallengeReview(userId, organization, challengeId);
    }

}