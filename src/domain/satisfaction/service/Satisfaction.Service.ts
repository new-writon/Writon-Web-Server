import { Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api";
import { SatisfactionStatus } from "../dto/response/SatisfactionSatus";
import { ChallengeApi } from "../infrastructure/Challenge.Api";
import { Restart } from "../dto/response/Restart";
import { TemplateApi } from "../infrastructure/Template.Api";
import { UserChallengeResult } from "../dto/response/UserChallengeResult";
import { SatisfactionHelper } from "../helper/Satisfaction.Helper";
import { SatisfactionQuestion } from "../dto/response/SatisfactionQuestion";


@Injectable()
export class SatisfactionService{

    constructor(
        private readonly satisfactionHelper:SatisfactionHelper,
        private readonly userApi: UserApi,
        private readonly challengeApi: ChallengeApi,
        private readonly templateApi: TemplateApi
    ){}


    public async bringSatisfactionStatus(
        userId:number,
        organization:string,
        challengeId:number
    ){
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId,true);
        return SatisfactionStatus.of(userChallengeData.getReview());
    }

    public async modifySatisfactionStatus(
        userId:number,
        organization:string,
        challengeId:number
    ){
       await this.userApi.requestUpdateUserChallengeReview(userId, organization, challengeId);
    }

    public async bringUserChallengeResult(userId:number, organization:string, challengeId:number):Promise<UserChallengeResult>{
        const affiliationData = await this.userApi.requestAffiliationByUserIdWithOrganization(userId, organization,true);
        let [challengeData, challengeOverlapCount, userChallengeData, challengeSuccessCount] = await Promise.all([
            this.challengeApi.requestChallengeById(challengeId,true),
            this.challengeApi.requestChallengeOverlapCount(challengeId),
            this.userApi.requestUserChallengeByAffiliationIdAndChallengeId(affiliationData.getId(), challengeId,true),
            this.templateApi.reqeustChallengeSuccessChallengeCount(affiliationData.getId(), challengeId)
        ]);
        return UserChallengeResult.of(affiliationData.getNickname(), organization, challengeData.getName(), challengeOverlapCount,
            challengeSuccessCount, userChallengeData.getUserDeposit(), challengeData.getDeposit(), challengeData.getReviewUrl());
    }

    public async bringSatisfactionQuestion(challengeId:number):Promise<SatisfactionQuestion[]>{
        const satisfactionData = await this.satisfactionHelper.giveSatisfactionByChallengeId(challengeId, true);
        return SatisfactionQuestion.of(satisfactionData);
    }

    public async bringReEngagement(challengeId:number){
        const challengeData = await this.challengeApi.requestChallengeById(challengeId,true);
        return Restart.of(challengeData.getRestart());     
    }

}