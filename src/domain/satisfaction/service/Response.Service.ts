import { Inject, Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api.js";
import { ObjectiveAnswer } from "../dto/ObjectiveAnswer.js";
import { ObjectiveAnswerType } from "../dto/ObjectiveAnswerType.js";
import { SatisfactionObjectiveResultRepository } from "../domain/repository/SatisfactionObjectiveResult.Repository.js";
import { SatisfactionObjectiveResultHelper } from "../helper/SatisfactionObjectiveResult.Helper.js";


@Injectable()
export class ResponseService{

    constructor(
        private readonly userApi: UserApi,
        private readonly satisfactionObjectiveHelper:SatisfactionObjectiveResultHelper
    ){}




    public async checkReEngagement(userId:number,  organization:string, challengeId:number, check:boolean){
        await this.userApi.requestUpdateUserChallengeReEngagement(userId,organization, challengeId, check);
    }


    public async answerObjectiveQuestion(userId:number,  organization:string, challengeId:number, satisfactionAnswer: Array<ObjectiveAnswer>){
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        const convertedObjectiveAnswer = this.convertObjectiveAnswerType(satisfactionAnswer, userChallengeData.getId());
        await this.satisfactionObjectiveHelper.executeInsertSatisfactionObjectiveResult(convertedObjectiveAnswer);
    }


    private convertObjectiveAnswerType(
    satisfationAnswer: Array<ObjectiveAnswer>,
    userChallengeId: number): ObjectiveAnswerType[]{
        return satisfationAnswer.map((answer) => new ObjectiveAnswerType(
            answer.getSatisfactionId(),
            answer.getScore(),
            userChallengeId
        ));
  }
    
}