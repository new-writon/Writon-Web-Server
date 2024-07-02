import { Inject, Injectable } from "@nestjs/common";
import { UserApi } from "../infrastructure/User.Api.js";
import { ObjectiveAnswer } from "../dto/ObjectiveAnswer.js";
import { ObjectiveAnswerType } from "../dto/ObjectiveAnswerType.js";

import { SatisfactionObjectiveResultHelper } from "../helper/SatisfactionObjectiveResult.Helper.js";
import { SubjectiveAnswer } from "../dto/SubjectiveAnswer.js";
import { SubjectiveAnswerType } from "../dto/SubjectiveAnswerType.js";
import { SatisfactionSubjectiveResultHelper } from "../helper/SatisfactionSubjectiveResult.Helper.js";


@Injectable()
export class ResponseService{

    constructor(
        private readonly userApi: UserApi,
        private readonly satisfactionObjectiveHelper:SatisfactionObjectiveResultHelper,
        private readonly satisfactionSubjectiveHelper:SatisfactionSubjectiveResultHelper
    ){}




    public async checkReEngagement(userId:number,  organization:string, challengeId:number, check:boolean){
        await this.userApi.requestUpdateUserChallengeReEngagement(userId,organization, challengeId, check);
    }


    public async penetrateObjectiveQuestion(userId:number,  organization:string, challengeId:number, satisfactionAnswer: Array<ObjectiveAnswer>){
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        const convertedObjectiveAnswer = this.convertObjectiveAnswerType(satisfactionAnswer, userChallengeData.getId());
        await this.satisfactionObjectiveHelper.executeInsertSatisfactionObjectiveResult(convertedObjectiveAnswer);
    }


    public async penetrateSubjectiveQuestion(userId:number,  organization:string, challengeId:number, satisfactionAnswer: Array<SubjectiveAnswer>){
        const userChallengeData = await this.userApi.requestUserChallengeWithUserIdAndOragnizationByChallengeId(userId, organization, challengeId);
        const convertedSubjectiveAnswer = this.convertSubjectiveAnswerType(satisfactionAnswer, userChallengeData.getId());
        await this.satisfactionSubjectiveHelper.executeInsertSatisfactionSubjectiveResult(convertedSubjectiveAnswer);
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

    private convertSubjectiveAnswerType(
    satisfationAnswer: Array<SubjectiveAnswer>,
    userChallengeId: number
    ){
    return satisfationAnswer.map((answer) => new SubjectiveAnswerType(
        answer.getSatisfactionId(),
        answer.getAnswer(),
        userChallengeId
    ));
  }
    
}